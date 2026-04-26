<script lang="ts">
import type { CalendarProps } from "../types/calendar";
import type { DateValue } from "@internationalized/date";
import {
  CalendarRoot,
  CalendarHeader,
  CalendarHeading,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridBody,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarCell,
  CalendarCellTrigger,
  CalendarPrev,
  CalendarNext,
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
} = defineProps<CalendarProps>();

const model = defineModel<DateValue>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, minValue, maxValue, locale, numberOfMonths, fixedWeeks, disabled, isDateDisabled, isDateUnavailable },
  handlers: { "update:modelValue": (v: DateValue | undefined) => { model.value = v; } },
}));
const headerPT = usePassthrough(pt?.header, { props: {}, handlers: {} });
const headingPT = usePassthrough(pt?.heading, { props: {}, handlers: {} });
const gridPT = usePassthrough(pt?.grid, { props: {}, handlers: {} });
const prevPT = usePassthrough(pt?.prev, { props: {}, handlers: {} });
const prevIconPT = usePassthrough(pt?.prevIcon, { props: { alias: "chevron-left" }, handlers: {} });
const nextPT = usePassthrough(pt?.next, { props: {}, handlers: {} });
const nextIconPT = usePassthrough(pt?.nextIcon, { props: { alias: "chevron-right" }, handlers: {} });
const gridHeadPT = usePassthrough(pt?.gridHead, { props: {}, handlers: {} });
const gridBodyPT = usePassthrough(pt?.gridBody, { props: {}, handlers: {} });
const gridRowPT = usePassthrough(pt?.gridRow, { props: {}, handlers: {} });
const headCellPT = usePassthrough(pt?.headCell, { props: {}, handlers: {} });

const cellPT = (date: DateValue) =>
  passthrough(pt?.cell, { props: { date }, handlers: {} });

const cellTriggerPT = (day: DateValue, month: DateValue) =>
  passthrough(pt?.cellTrigger, { props: { day, month }, handlers: {} });

const ctx = computed(() => ({
  minValue,
  maxValue,
  locale,
  numberOfMonths,
  fixedWeeks,
  disabled,
  isDateDisabled,
  isDateUnavailable,
  model: model.value,
}));
</script>

<template>
  <CalendarRoot
    ref="el"
    v-slot="{ weekDays, grid }"
    v-bind="rootPT.props"
    class="f-calendar"
    v-on="rootPT.handlers"
  >
    <slot name="header" v-bind="{ ...ctx, weekDays, grid }">
      <CalendarHeader v-bind="headerPT.props" class="f-calendar-header" v-on="headerPT.handlers">
        <slot name="prev" v-bind="{ ...ctx, weekDays, grid }">
          <CalendarPrev v-bind="prevPT.props" class="f-calendar-nav" v-on="prevPT.handlers">
            <slot name="prevIcon" v-bind="{ ...ctx, weekDays, grid }">
              <Icon v-bind="prevIconPT.props" v-on="prevIconPT.handlers" />
            </slot>
          </CalendarPrev>
        </slot>
        <slot name="heading" v-bind="{ ...ctx, weekDays, grid }">
          <CalendarHeading v-bind="headingPT.props" class="f-calendar-heading" v-on="headingPT.handlers" />
        </slot>
        <slot name="next" v-bind="{ ...ctx, weekDays, grid }">
          <CalendarNext v-bind="nextPT.props" class="f-calendar-nav" v-on="nextPT.handlers">
            <slot name="nextIcon" v-bind="{ ...ctx, weekDays, grid }">
              <Icon v-bind="nextIconPT.props" v-on="nextIconPT.handlers" />
            </slot>
          </CalendarNext>
        </slot>
      </CalendarHeader>
    </slot>
    <slot v-for="month in grid" name="grid" v-bind="{ ...ctx, weekDays, grid, month }">
      <CalendarGrid :key="month.value.toString()" v-bind="gridPT.props" class="f-calendar-grid" v-on="gridPT.handlers">
        <slot name="gridHead" v-bind="{ ...ctx, weekDays, grid, month }">
          <CalendarGridHead v-bind="gridHeadPT.props" v-on="gridHeadPT.handlers">
            <CalendarGridRow v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
              <slot v-for="day in weekDays" name="headCell" v-bind="{ ...ctx, day }">
                <CalendarHeadCell
                  :key="day"
                  v-bind="headCellPT.props"
                  class="f-calendar-head-cell"
                  v-on="headCellPT.handlers"
                >
                  {{ day }}
                </CalendarHeadCell>
              </slot>
            </CalendarGridRow>
          </CalendarGridHead>
        </slot>
        <slot name="gridBody" v-bind="{ ...ctx, weekDays, grid, month }">
          <CalendarGridBody v-bind="gridBodyPT.props" v-on="gridBodyPT.handlers">
            <CalendarGridRow
              v-for="(week, i) in month.rows"
              :key="i"
              v-bind="gridRowPT.props"
              class="f-calendar-row"
              v-on="gridRowPT.handlers"
            >
            <slot v-for="date in week" name="cell" v-bind="{ ...ctx, month, date }">
              <CalendarCell
                :key="date.toString()"
                v-bind="cellPT(date).props"
                class="f-calendar-cell"
                v-on="cellPT(date).handlers"
              >
                <slot name="cellTrigger" v-bind="{ ...ctx, month, date }">
                  <CalendarCellTrigger
                    v-bind="cellTriggerPT(date, month.value).props"
                    class="f-calendar-cell-trigger"
                    v-on="cellTriggerPT(date, month.value).handlers"
                  />
                </slot>
              </CalendarCell>
            </slot>
          </CalendarGridRow>
          </CalendarGridBody>
        </slot>
      </CalendarGrid>
    </slot>
  </CalendarRoot>
</template>
