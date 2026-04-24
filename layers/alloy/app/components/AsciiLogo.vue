<script lang="ts">
import figlet, { type FontName } from "figlet";
// @ts-expect-error - figlet font import
import ansiRegular from "figlet/importable-fonts/ANSI Regular";
import type { AsciiLogoProps } from "../types/ascii-logo";
</script>

<script setup lang="ts">
figlet.parseFont("ANSI Regular", ansiRegular);

const { text, font, link, pt } = defineProps<AsciiLogoProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const ascii = computed(() => {
  try {
    const raw = figlet.textSync(text, {
      font: (font as FontName) ?? "ANSI Regular",
    });
    const lines = raw.split("\n").map((line) => line.trimEnd());
    while (lines.length && !lines[0]!.trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1]!.trim()) lines.pop();
    return lines.join("\n");
  } catch {
    return text;
  }
});

const linkPT = usePassthrough(pt?.link, {});
const prePT = usePassthrough(pt?.pre, {});

const ctx = computed(() => ({ text, font, link, ascii: ascii.value }));
</script>

<template>
  <Anchor v-if="link !== false" ref="el" to="/" v-bind="linkPT.props" class="f-ascii-logo-link" v-on="linkPT.handlers">
    <slot name="pre" v-bind="ctx">
      <Pre v-bind="prePT.props" class="f-ascii-logo" v-on="prePT.handlers">{{ ascii }}</Pre>
    </slot>
  </Anchor>
  <slot v-else name="pre" v-bind="ctx">
    <Pre v-bind="prePT.props" class="f-ascii-logo" v-on="prePT.handlers">{{ ascii }}</Pre>
  </slot>
</template>

<style>
.f-ascii-logo-link {
  text-decoration: none;
  color: currentColor;
}

.f-ascii-logo-link:hover {
  color: var(--sys-primary);
}

.f-ascii-logo-link:focus-visible {
  outline: 2px solid var(--sys-primary);
  outline-offset: 4px;
}

.f-ascii-logo {
  font-family: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Cascadia Code', monospace;
  font-size: 0.35rem;
  line-height: 1;
  margin: 0;
  white-space: pre;
  color: currentColor;
}

@media (max-width: 1024px) {
  .f-ascii-logo {
    font-size: 0.25rem;
  }
}
</style>
