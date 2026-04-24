<script lang="ts">
import type { KeywordsProps } from "../types/keywords";
</script>

<script setup lang="ts">
const { pt } = defineProps<KeywordsProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const keywords = defineModel<string>({ default: "" });
const open = ref(false);
const includeInput = ref("");
const excludeInput = ref("");

// Detect if current keyword string uses OR mode
const isOrMode = computed(() => keywords.value.includes("||"));
const mode = ref<"and" | "or">(isOrMode.value ? "or" : "and");

// Sync mode when keywords change externally
watch(isOrMode, (v) => { mode.value = v ? "or" : "and"; });

// Parse keyword string into include/exclude arrays
// Handles: +term, -term, "quoted phrase", term1 || term2
const parseEntries = (kw: string) => {
  if (!kw.trim()) return { include: [] as string[], exclude: [] as string[] };
  const include: string[] = [];
  const exclude: string[] = [];
  const cleaned = kw.replace(/\|\|/g, " ");
  const regex = /([+-])(?:"([^"]+)"|([^\s"+-]\S*))/g;
  let m;
  while ((m = regex.exec(cleaned)) !== null) {
    const prefix = m[1];
    const term = m[2] ?? m[3] ?? "";
    if (!term) continue;
    if (prefix === "-") exclude.push(term);
    else include.push(term);
  }
  return { include, exclude };
};

const parsed = computed(() => parseEntries(keywords.value));

const quoteTerm = (t: string) => t.includes(" ") ? `"${t}"` : t;

const buildKeywordString = (include: string[], exclude: string[]) => {
  const parts: string[] = [];
  if (include.length) {
    const joiner = mode.value === "or" ? " || " : " ";
    parts.push(include.map((t) => `+${quoteTerm(t)}`).join(joiner));
  }
  if (exclude.length) {
    parts.push(exclude.map((t) => `-${quoteTerm(t)}`).join(" "));
  }
  return parts.join(" ");
};

const includeModel = computed({
  get: () => parsed.value.include,
  set: (val: string[]) => {
    const excludeFiltered = parsed.value.exclude.filter((t) => !val.includes(t));
    keywords.value = buildKeywordString(val, excludeFiltered);
  },
});

const excludeModel = computed({
  get: () => parsed.value.exclude,
  set: (val: string[]) => {
    const includeFiltered = parsed.value.include.filter((t) => !val.includes(t));
    keywords.value = buildKeywordString(includeFiltered, val);
  },
});

// When mode changes, rebuild the string with new joiner
watch(mode, () => {
  keywords.value = buildKeywordString(parsed.value.include, parsed.value.exclude);
});

const activeCount = computed(() => parsed.value.include.length + parsed.value.exclude.length);

const addTag = (term: string, target: "include" | "exclude") => {
  if (!term) return;
  if (target === "include") {
    if (includeModel.value.includes(term)) return;
    includeModel.value = [...includeModel.value, term];
  } else {
    if (excludeModel.value.includes(term)) return;
    excludeModel.value = [...excludeModel.value, term];
  }
};

const removeTag = (term: string, target: "include" | "exclude") => {
  if (target === "include") {
    includeModel.value = includeModel.value.filter((t) => t !== term);
  } else {
    excludeModel.value = excludeModel.value.filter((t) => t !== term);
  }
};

const handleInput = (raw: string, target: "include" | "exclude") => {
  if (raw.startsWith('"')) {
    if (raw.endsWith('"') && raw.length > 2) {
      addTag(raw.slice(1, -1), target);
      return "";
    }
    return raw;
  }
  if (raw.endsWith(" ")) {
    const term = raw.trim();
    if (term) addTag(term, target);
    return "";
  }
  return raw;
};

const onIncludeInput = (event: Event) => {
  includeInput.value = handleInput((event.target as HTMLInputElement).value, "include");
};

const onExcludeInput = (event: Event) => {
  excludeInput.value = handleInput((event.target as HTMLInputElement).value, "exclude");
};

const onIncludeKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const term = includeInput.value.trim().replace(/^"|"$/g, "");
    if (term) addTag(term, "include");
    includeInput.value = "";
  }
  if (event.key === "Backspace" && !includeInput.value && includeModel.value.length) {
    removeTag(includeModel.value[includeModel.value.length - 1]!, "include");
  }
};

const onExcludeKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const term = excludeInput.value.trim().replace(/^"|"$/g, "");
    if (term) addTag(term, "exclude");
    excludeInput.value = "";
  }
  if (event.key === "Backspace" && !excludeInput.value && excludeModel.value.length) {
    removeTag(excludeModel.value[excludeModel.value.length - 1]!, "exclude");
  }
};

const matchOptions: Option[] = [
  { value: "and", label: "AND" },
  { value: "or", label: "OR" },
];

const rootPT = usePassthrough(pt?.root, {});
const includePT = usePassthrough(pt?.include, {});
const excludePT = usePassthrough(pt?.exclude, {});
const matchPT = usePassthrough(pt?.match, {});
const includeInputPT = usePassthrough(pt?.includeInput, {
  props: { placeholder: "Add keyword...", delimiter: "" },
});
const excludeInputPT = usePassthrough(pt?.excludeInput, {
  props: { placeholder: "Exclude keyword...", delimiter: "" },
});

const ctx = computed(() => ({
  keywords: keywords.value,
  includeEntries: includeModel.value,
  excludeEntries: excludeModel.value,
  mode: mode.value,
  activeCount: activeCount.value,
  open: open.value,
}));
</script>

<template>
  <Popover v-model:open="open" align="end">
    <slot name="trigger" v-bind="ctx">
      <Fab icon="tag" :badge="activeCount > 0 ? activeCount : undefined" />
    </slot>
    <template #content>
      <slot v-bind="ctx">
        <Group ref="el" v-bind="rootPT.props" class="f-keywords" v-on="rootPT.handlers">
          <slot name="include" v-bind="ctx">
            <Group v-bind="includePT.props" class="f-keywords-section" v-on="includePT.handlers">
              <slot name="include-label" v-bind="ctx">
                <Caption class="f-keywords-label">Include</Caption>
              </slot>
              <TagsInput
                v-model="includeModel"
                v-bind="includeInputPT.props"
                class="f-keywords-tags"
                v-on="includeInputPT.handlers"
              >
                <template #input>
                  <input
                    :value="includeInput"
                    placeholder="Add keyword..."
                    class="f-tags-input-input"
                    @input="onIncludeInput"
                    @keydown="onIncludeKeydown"
                  >
                </template>
              </TagsInput>
            </Group>
          </slot>
          <slot name="exclude" v-bind="ctx">
            <Group v-bind="excludePT.props" class="f-keywords-section" v-on="excludePT.handlers">
              <slot name="exclude-label" v-bind="ctx">
                <Caption class="f-keywords-label">Exclude</Caption>
              </slot>
              <TagsInput
                v-model="excludeModel"
                v-bind="excludeInputPT.props"
                class="f-keywords-tags"
                v-on="excludeInputPT.handlers"
              >
                <template #input>
                  <input
                    :value="excludeInput"
                    placeholder="Exclude keyword..."
                    class="f-tags-input-input"
                    @input="onExcludeInput"
                    @keydown="onExcludeKeydown"
                  >
                </template>
              </TagsInput>
            </Group>
          </slot>
          <slot name="match" v-bind="ctx">
            <Group v-bind="matchPT.props" class="f-keywords-match" v-on="matchPT.handlers">
              <slot name="match-label" v-bind="ctx">
                <Caption class="f-keywords-label">Match</Caption>
              </slot>
              <SegmentedControl v-model="mode" :options="matchOptions" />
            </Group>
          </slot>
        </Group>
      </slot>
    </template>
  </Popover>
</template>
