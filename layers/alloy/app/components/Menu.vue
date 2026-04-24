<script lang="ts">
import type { MenuProps, MenuEmits, MenuItem } from "../types/menu";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "reka-ui";
</script>

<script setup lang="ts">
const {
  groups,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  alignOffset = 0,
  pt,
} = defineProps<MenuProps>();

const emit = defineEmits<MenuEmits>();

const el = useTemplateRef("el");
defineExpose({ el });

const open = defineModel<boolean>("open", { default: false });

const onSelect = (item: MenuItem) => {
  emit("select", item);
};

const rootPT = usePassthrough(pt?.root, {});
const contentPT = usePassthrough(pt?.content, {
  props: { side, align, sideOffset, alignOffset },
});
const separatorPT = usePassthrough(pt?.separator, {});

const groupsPT = computed(() =>
  groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      item,
      pt: passthrough(pt?.item, {
        props: { disabled: item.disabled },
        handlers: { select: () => onSelect(item) },
      }),
    })),
  })),
);

const ctx = computed(() => ({ groups, open: open.value }));
</script>

<template>
  <DropdownMenuRoot ref="el" v-model:open="open" v-bind="rootPT.props" v-on="rootPT.handlers">
    <DropdownMenuTrigger as-child>
      <slot v-bind="ctx" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        v-bind="contentPT.props"
        class="f-menu-content"
        v-on="contentPT.handlers"
      >
        <slot name="content" v-bind="ctx">
          <template v-for="(group, groupIndex) in groupsPT" :key="group.key">
            <DropdownMenuSeparator
              v-if="groupIndex > 0"
              v-bind="separatorPT.props"
              class="f-menu-separator"
              v-on="separatorPT.handlers"
            />
            <DropdownMenuGroup>
              <DropdownMenuLabel v-if="group.label" as-child>
                <slot name="group-label" v-bind="{ ...ctx, group }">
                  <Caption>{{ group.label }}</Caption>
                </slot>
              </DropdownMenuLabel>
              <DropdownMenuItem
                v-for="entry in group.items"
                :key="entry.item.label"
                v-bind="entry.pt.props"
                class="f-menu-item"
                v-on="entry.pt.handlers"
              >
                <slot name="item" v-bind="{ ...ctx, item: entry.item }">
                  <Icon v-if="entry.item.icon" :alias="entry.item.icon" />
                  <Span class="f-menu-item-label">{{ entry.item.label }}</Span>
                </slot>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </template>
        </slot>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
