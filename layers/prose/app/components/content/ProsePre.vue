<script setup lang="ts">
const { code } = defineProps<{
  code: string;
}>();

const copied = ref(false);

const copyCode = async () => {
  await navigator.clipboard.writeText(code);

  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <Pre>
    <Button class="f-prose-pre" @click="copyCode">
      <Icon :alias="copied ? 'check' : 'copy'" />
    </Button>
    <slot />
  </Pre>
</template>

<style>
.f-pre {
  position: relative;
}

.f-pre .f-prose-pre {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
