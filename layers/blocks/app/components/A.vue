<script lang="ts">
export interface AProps {
  label?: string;
  to?: string;
  external?: boolean;
  target?: "_blank" | "_self";
  replace?: boolean;
  prefetch?: boolean;
  disabled?: boolean;
  tokens?: Tokens<"a">;
}
</script>

<script setup lang="ts">
const { label, to, external, target, replace, prefetch, disabled, tokens } =
  defineProps<AProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <NuxtLink
    :to="disabled ? undefined : to"
    :external="external"
    :target="target"
    :replace="replace"
    :prefetch="prefetch"
    :style="styles.a"
    :aria-disabled="disabled"
    :aria-current="disabled ? 'page' : undefined"
    class="f-a"
  >
    <slot>
      {{ label }}
    </slot>
  </NuxtLink>
</template>

<style>
@import '#build/untheme/a.css';
</style>
