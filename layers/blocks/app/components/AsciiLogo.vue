<script setup lang="ts">
import figlet from "figlet";
// @ts-expect-error - figlet font import
import ansiRegular from "figlet/importable-fonts/ANSI Regular";

figlet.parseFont("ANSI Regular", ansiRegular);

const props = defineProps<{
  text: string;
  font?: string;
}>();

const ascii = computed(() => {
  try {
    const raw = figlet.textSync(props.text, {
      font: (props.font as figlet.Fonts) ?? "ANSI Regular",
    });
    // Trim trailing whitespace from each line and remove empty lines at start/end
    const lines = raw.split("\n").map((line) => line.trimEnd());
    // Remove empty lines from start and end
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    return lines.join("\n");
  } catch {
    return props.text;
  }
});
</script>

<template>
  <NuxtLink to="/" class="f-ascii-logo-link">
    <pre class="f-ascii-logo">{{ ascii }}</pre>
  </NuxtLink>
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
</style>
