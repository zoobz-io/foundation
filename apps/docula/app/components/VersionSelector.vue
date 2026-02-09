<script setup lang="ts">
const route = useRoute();
const { current, versions, latest } = useVersion();

const options = versions.map((v) => ({
  value: v,
  label: v === latest ? `${v} (latest)` : v,
}));

const selected = ref(current || latest);

const displayLabel = computed(() => {
  if (!selected.value) return "Version";
  return selected.value === latest ? `${selected.value} (latest)` : selected.value;
});

watch(selected, (version) => {
  if (version && version !== current) {
    const path = route.path.replace(/^\/v[\d.]+/, "");
    navigateTo(`/v${version}${path}`);
  }
});
</script>

<template>
  <SelectRoot
    v-if="options.length > 0"
    v-model="selected"
    class="f-version-select-root"
  >
    <SelectTrigger as-child>
      <Button>
        {{ displayLabel }}
        <Icon alias="chevron-down" />
      </Button>
    </SelectTrigger>
    <SelectContent position="popper" class="f-version-select-content">
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="f-version-select-item"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>
