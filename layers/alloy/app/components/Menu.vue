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

const rootPT = usePassthrough(pt?.root, () => ({
  props: { open: open.value },
  handlers: { "update:open": (v: boolean) => { open.value = v; } },
}));
const contentPT = usePassthrough(pt?.content, {
  props: { side, align, sideOffset, alignOffset },
  handlers: {},
});
const groupLabelPT = usePassthrough(pt?.groupLabel, { props: {}, handlers: {} });
const itemLabelPT = usePassthrough(pt?.itemLabel, { props: {}, handlers: {} });
const separatorPT = usePassthrough(pt?.separator, { props: {}, handlers: {} });

const groupsPT = computed(() =>
  groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      item,
      pt: passthrough(pt?.item, {
        props: { disabled: item.disabled },
        handlers: { select: () => onSelect(item) },
      }),
      iconPT: item.icon
        ? passthrough(pt?.itemIcon, { props: { alias: item.icon }, handlers: {} })
        : null,
    })),
  })),
);

const ctx = computed(() => ({ groups, open: open.value }));
</script>

<template>
  <DropdownMenuRoot ref="el" v-bind="rootPT.props" v-on="rootPT.handlers">
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
                  <Caption v-bind="groupLabelPT.props" v-on="groupLabelPT.handlers">{{ group.label }}</Caption>
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
                  <slot name="itemIcon" v-bind="{ ...ctx, item: entry.item }">
                    <Icon v-if="entry.iconPT" v-bind="entry.iconPT.props" v-on="entry.iconPT.handlers" />
                  </slot>
                  <slot name="itemLabel" v-bind="{ ...ctx, item: entry.item }">
                    <Span v-bind="itemLabelPT.props" class="f-menu-item-label" v-on="itemLabelPT.handlers">{{ entry.item.label }}</Span>
                  </slot>
                </slot>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </template>
        </slot>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
