<script lang="ts">
export interface AProps {
  label?: string;
  to?: string;
  external?: boolean;
  target?: "_blank" | "_self";
  replace?: boolean;
  prefetch?: boolean;
  tokens?: Tokens<"a">;
}
</script>

<script setup lang="ts">
const { label, to, external, target, replace, prefetch, tokens } =
  defineProps<AProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <NuxtLink
    :to="to"
    :external="external"
    :target="target"
    :replace="replace"
    :prefetch="prefetch"
    :style="styles.a"
    class="f-a"
  >
    <slot>
      {{ label }}
    </slot>
  </NuxtLink>
</template>
