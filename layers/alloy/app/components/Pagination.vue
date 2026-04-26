<script lang="ts">
import type { PaginationProps, PaginationEmits } from "../types/pagination";
</script>

<script setup lang="ts">
const { page, pageSize, pageCount, total, goToPage, pt } = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEmits>();

const el = useTemplateRef("el");
defineExpose({ el });

const pageSizeOptions = [
  { value: "5", label: "Show 5" },
  { value: "10", label: "Show 10" },
  { value: "25", label: "Show 25" },
  { value: "50", label: "Show 50" },
];

const hasPrev = computed(() => page > 1);
const hasNext = computed(() => page < pageCount);

const first = () => goToPage(1);
const prev = () => goToPage(page - 1);
const next = () => goToPage(page + 1);
const last = () => goToPage(pageCount);

const pageSizeModel = computed({
  get: () => String(pageSize),
  set: (v) => emit("update:pageSize", Number(v)),
});

const pageNumbers = computed(() => Pagination.paginate(page, pageCount));

const rootPT = usePassthrough(pt?.root, { props: {}, handlers: {} });
const infoPT = usePassthrough(pt?.info, { props: {}, handlers: {} });
const pagesPT = usePassthrough(pt?.pages, { props: {}, handlers: {} });
const firstPT = usePassthrough(pt?.first, () => ({ props: { disabled: !hasPrev.value, icon: "chevron-first" as IconAlias }, handlers: { click: first } }));
const prevPT = usePassthrough(pt?.prev, () => ({ props: { disabled: !hasPrev.value, icon: "chevron-left" as IconAlias }, handlers: { click: prev } }));
const nextPT = usePassthrough(pt?.next, () => ({ props: { disabled: !hasNext.value, icon: "chevron-right" as IconAlias }, handlers: { click: next } }));
const lastPT = usePassthrough(pt?.last, () => ({ props: { disabled: !hasNext.value, icon: "chevron-last" as IconAlias }, handlers: { click: last } }));
const numbersPT = usePassthrough(pt?.numbers, { props: {}, handlers: {} });
const numberPT = usePassthrough(pt?.number, { props: { type: "button" as const }, handlers: {} });
const pageSizePT = usePassthrough(pt?.pageSize, () => ({
  props: { modelValue: pageSizeModel.value, options: pageSizeOptions },
  handlers: { "update:modelValue": (v: string) => { pageSizeModel.value = v; } },
}));

const ctx = computed(() => ({ page, pageSize, pageCount, total, hasPrev: hasPrev.value, hasNext: hasNext.value, pageNumbers: pageNumbers.value }));
</script>

<template>
  <Group ref="el" v-bind="rootPT.props" class="f-pagination" v-on="rootPT.handlers">
    <slot name="info" v-bind="ctx">
      <Span v-bind="infoPT.props" class="f-pagination-info" v-on="infoPT.handlers">
        Page {{ page }} of {{ pageCount }} ({{ total }} results)
      </Span>
    </slot>

    <slot name="pages" v-bind="ctx">
      <Group v-bind="pagesPT.props" class="f-pagination-pages" v-on="pagesPT.handlers">
        <slot name="first" v-bind="ctx">
          <Fab v-bind="firstPT.props" v-on="firstPT.handlers" />
        </slot>
        <slot name="prev" v-bind="ctx">
          <Fab v-bind="prevPT.props" v-on="prevPT.handlers" />
        </slot>

        <slot name="numbers" v-bind="ctx">
          <Group v-bind="numbersPT.props" class="f-pagination-numbers" v-on="numbersPT.handlers">
            <slot v-for="(p, i) in pageNumbers" name="number" v-bind="{ ...ctx, page: p }">
              <Button
                :key="i"
                v-bind="{ ...numberPT.props, disabled: p === '...' || p === page, 'data-selected': p === page ? '' : undefined }"
                class="f-pagination-number"
                v-on="numberPT.handlers"
                @click="typeof p === 'number' && goToPage(p)"
              >
                {{ p }}
              </Button>
            </slot>
          </Group>
        </slot>

        <slot name="next" v-bind="ctx">
          <Fab v-bind="nextPT.props" v-on="nextPT.handlers" />
        </slot>
        <slot name="last" v-bind="ctx">
          <Fab v-bind="lastPT.props" v-on="lastPT.handlers" />
        </slot>
      </Group>
    </slot>

    <slot name="pageSize" v-bind="ctx">
      <Select
        v-bind="pageSizePT.props"
        v-on="pageSizePT.handlers"
      />
    </slot>
  </Group>
</template>
