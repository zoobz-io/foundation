<script lang="ts">
import type { RangeCalendarProps } from "../types/range-calendar";
import type { DateRange } from "reka-ui";
import type { DateValue } from "@internationalized/date";
import {
  RangeCalendarRoot,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarGrid,
  RangeCalendarGridHead,
  RangeCalendarGridBody,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarPrev,
  RangeCalendarNext,
} from "reka-ui";
</script>

<script setup lang="ts">
const {
  pt,
  minValue,
  maxValue,
  locale,
  numberOfMonths = 1,
  fixedWeeks,
  disabled,
  isDateDisabled,
  isDateUnavailable,
} = defineProps<RangeCalendarProps>();

const model = defineModel<DateRange>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, minValue, maxValue, locale, numberOfMonths, fixedWeeks, disabled, isDateDisabled, isDateUnavailable },
  handlers: { "update:modelValue": (v: DateRange) => { model.value = v; } },
}));
const headerPT = usePassthrough(pt?.header, { props: {}, handlers: {} });
const headingPT = usePassthrough(pt?.heading, { props: {}, handlers: {} });
const gridPT = usePassthrough(pt?.grid, { props: {}, handlers: {} });
const prevPT = usePassthrough(pt?.prev, { props: {}, handlers: {} });
const prevIconPT = usePassthrough(pt?.prevIcon, { props: { alias: "chevron-left" }, handlers: {} });
const nextPT = usePassthrough(pt?.next, { props: {}, handlers: {} });
const nextIconPT = usePassthrough(pt?.nextIcon, { props: { alias: "chevron-right" }, handlers: {} });
const gridsPT = usePassthrough(pt?.grids, { props: {}, handlers: {} });
const gridHeadPT = usePassthrough(pt?.gridHead, { props: {}, handlers: {} });
const gridBodyPT = usePassthrough(pt?.gridBody, { props: {}, handlers: {} });
const gridRowPT = usePassthrough(pt?.gridRow, { props: {}, handlers: {} });
const headCellPT = usePassthrough(pt?.headCell, { props: {}, handlers: {} });

const cellPT = (date: DateValue) =>
  passthrough(pt?.cell, { props: { date }, handlers: {} });

const cellTriggerPT = (day: DateValue, month: DateValue) =>
  passthrough(pt?.cellTrigger, { props: { day, month }, handlers: {} });

const ctx = computed(() => ({
  minValue, maxValue, locale, numberOfMonths, fixedWeeks, disabled, isDateDisabled, isDateUnavailable,
  model: model.value,
}));
</script>

<template>
  <RangeCalendarRoot
    ref="el"
    v-slot="{ weekDays, grid }"
    v-bind="rootPT.props"
    class="f-calendar f-calendar--range"
    v-on="rootPT.handlers"
  >
    <slot name="header" v-bind="{ ...ctx, weekDays, grid }">
      <RangeCalendarHeader v-bind="headerPT.props" class="f-calendar-header" v-on="headerPT.handlers">
        <slot name="prev" v-bind="{ ...ctx, weekDays, grid }">
          <RangeCalendarPrev v-bind="prevPT.props" class="f-calendar-nav" v-on="prevPT.handlers">
            <slot name="prevIcon" v-bind="{ ...ctx, weekDays, grid }">
              <Icon v-bind="prevIconPT.props" v-on="prevIconPT.handlers" />
            </slot>
          </RangeCalendarPrev>
        </slot>
        <slot name="heading" v-bind="{ ...ctx, weekDays, grid }">
          <RangeCalendarHeading v-bind="headingPT.props" class="f-calendar-heading" v-on="headingPT.handlers" />
        </slot>
        <slot name="next" v-bind="{ ...ctx, weekDays, grid }">
          <RangeCalendarNext v-bind="nextPT.props" class="f-calendar-nav" v-on="nextPT.handlers">
            <slot name="nextIcon" v-bind="{ ...ctx, weekDays, grid }">
              <Icon v-bind="nextIconPT.props" v-on="nextIconPT.handlers" />
            </slot>
          </RangeCalendarNext>
        </slot>
      </RangeCalendarHeader>
    </slot>
    <slot name="grids" v-bind="{ ...ctx, weekDays, grid }">
      <Group v-bind="gridsPT.props" class="f-calendar-grids" v-on="gridsPT.handlers">
        <slot v-for="month in grid" name="grid" v-bind="{ ...ctx, weekDays, grid, month }">
          <RangeCalendarGrid :key="month.value.toString()" v-bind="gridPT.props" class="f-calendar-grid" v-on="gridPT.handlers">
            <slot name="gridHead" v-bind="{ ...ctx, weekDays, grid, month }">
              <RangeCalendarGridHead v-bind="gridHeadPT.props" v-on="gridHeadPT.handlers">
                <RangeCalendarGridRow v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
                  <slot v-for="day in weekDays" name="headCell" v-bind="{ ...ctx, day }">
                    <RangeCalendarHeadCell :key="day" v-bind="headCellPT.props" class="f-calendar-head-cell" v-on="headCellPT.handlers">
                      {{ day }}
                    </RangeCalendarHeadCell>
                  </slot>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
            </slot>
            <slot name="gridBody" v-bind="{ ...ctx, weekDays, grid, month }">
              <RangeCalendarGridBody v-bind="gridBodyPT.props" v-on="gridBodyPT.handlers">
                <RangeCalendarGridRow v-for="(week, i) in month.rows" :key="i" v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
                  <slot v-for="date in week" name="cell" v-bind="{ ...ctx, month, date }">
                    <RangeCalendarCell
                      :key="date.toString()"
                      v-bind="cellPT(date).props"
                      class="f-calendar-cell"
                      v-on="cellPT(date).handlers"
                    >
                      <slot name="cellTrigger" v-bind="{ ...ctx, month, date }">
                        <RangeCalendarCellTrigger
                          v-bind="cellTriggerPT(date, month.value).props"
                          class="f-calendar-cell-trigger"
                          v-on="cellTriggerPT(date, month.value).handlers"
                        />
                      </slot>
                    </RangeCalendarCell>
                  </slot>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </slot>
          </RangeCalendarGrid>
        </slot>
      </Group>
    </slot>
  </RangeCalendarRoot>
</template>
