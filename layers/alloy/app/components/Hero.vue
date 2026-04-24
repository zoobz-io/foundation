<script lang="ts">
import type { HeroProps } from "../types/hero";
</script>

<script setup lang="ts">
const { tagline, taglineHighlight, description, action, pt } = defineProps<HeroProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {});
const contentPT = usePassthrough(pt?.content, {});
const taglinePT = usePassthrough(pt?.tagline, {});
const descriptionPT = usePassthrough(pt?.description, {});
const buttonPT = usePassthrough(pt?.button, {});
const showcasePT = usePassthrough(pt?.showcase, {});

const ctx = computed(() => ({ tagline, taglineHighlight, description, action }));
</script>

<template>
  <Section ref="el" v-bind="rootPT.props" class="f-hero" v-on="rootPT.handlers">
    <slot name="content" v-bind="ctx">
      <Group v-bind="contentPT.props" class="f-hero-content" v-on="contentPT.handlers">
        <slot name="tagline" v-bind="ctx">
          <H1 v-bind="taglinePT.props" class="f-hero-tagline" v-on="taglinePT.handlers">
            {{ tagline }}
            <Em v-if="taglineHighlight" class="f-hero-tagline-highlight">
              {{ taglineHighlight }}
            </Em>
          </H1>
        </slot>
        <slot name="description" v-bind="ctx">
          <P v-if="description" v-bind="descriptionPT.props" v-on="descriptionPT.handlers">{{ description }}</P>
        </slot>
        <slot name="button" v-bind="ctx">
          <Button v-if="action" v-bind="buttonPT.props" :label="action.label" v-on="buttonPT.handlers" />
        </slot>
      </Group>
    </slot>
    <Group v-if="$slots.showcase" v-bind="showcasePT.props" class="f-hero-showcase" v-on="showcasePT.handlers">
      <slot name="showcase" v-bind="ctx" />
    </Group>
  </Section>
</template>
