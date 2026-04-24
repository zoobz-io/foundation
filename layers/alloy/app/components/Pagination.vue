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

const pageNumbers = computed(() => {
  const pages: (number | "...")[] = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < pageCount - 2) pages.push("...");
    pages.push(pageCount);
  }
  return pages;
});

const rootPT = usePassthrough(pt?.root, {});
const infoPT = usePassthrough(pt?.info, {});
const pagesPT = usePassthrough(pt?.pages, {});

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
        <Fab :disabled="!hasPrev" @click="first">
          <Icon alias="chevron-first" />
        </Fab>
        <Fab :disabled="!hasPrev" @click="prev">
          <Icon alias="chevron-left" />
        </Fab>

        <Group class="f-pagination-numbers">
          <Button
            v-for="(p, i) in pageNumbers"
            :key="i"
            type="button"
            class="f-pagination-number"
            :disabled="p === '...' || p === page"
            :data-selected="p === page ? '' : undefined"
            @click="typeof p === 'number' && goToPage(p)"
          >
            {{ p }}
          </Button>
        </Group>

        <Fab :disabled="!hasNext" @click="next">
          <Icon alias="chevron-right" />
        </Fab>
        <Fab :disabled="!hasNext" @click="last">
          <Icon alias="chevron-last" />
        </Fab>
      </Group>
    </slot>

    <Select
      v-model="pageSizeModel"
      :options="pageSizeOptions"
    />
  </Group>
</template>
