<script lang="ts">
import type { DatePickerProps } from "../types/date-picker";
import type { DatePickerInputProps } from "reka-ui";
import type { DateValue } from "@internationalized/date";
import {
  DatePickerRoot,
  DatePickerField,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerCalendar,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerGrid,
  DatePickerGridHead,
  DatePickerGridBody,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerPrev,
  DatePickerNext,
} from "reka-ui";
</script>

<script setup lang="ts">
const {
  pt,
  minValue,
  maxValue,
  locale,
  disabled,
  granularity = "day",
  isDateDisabled,
} = defineProps<DatePickerProps>();

const model = defineModel<DateValue>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, minValue, maxValue, locale, disabled, granularity, isDateDisabled },
  handlers: { "update:modelValue": (v: DateValue | undefined) => { model.value = v; } },
}));
const contentPT = usePassthrough(pt?.content, {
  props: { sideOffset: 8 },
  handlers: {},
});
const headerPT = usePassthrough(pt?.header, { props: {}, handlers: {} });
const headingPT = usePassthrough(pt?.heading, { props: {}, handlers: {} });
const gridPT = usePassthrough(pt?.grid, { props: {}, handlers: {} });
const fieldPT = usePassthrough(pt?.field, { props: {}, handlers: {} });
const inputPT = (part: DatePickerInputProps["part"]) =>
  passthrough(pt?.input, { props: { part }, handlers: {} });
const triggerPT = usePassthrough(pt?.trigger, { props: {}, handlers: {} });
const triggerIconPT = usePassthrough(pt?.triggerIcon, { props: { alias: "calendar" }, handlers: {} });
const calendarPT = usePassthrough(pt?.calendar, { props: {}, handlers: {} });
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
  minValue, maxValue, locale, disabled, granularity, isDateDisabled,
  model: model.value,
}));
</script>

<template>
  <DatePickerRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-date-picker"
    v-on="rootPT.handlers"
  >
    <slot name="field" v-bind="ctx">
      <DatePickerField v-slot="{ segments }" v-bind="fieldPT.props" class="f-date-picker-field" v-on="fieldPT.handlers">
        <template v-for="segment in segments" :key="segment.part">
          <slot name="input" v-bind="{ ...ctx, segment }">
            <DatePickerInput
              v-if="segment.part === 'literal'"
              v-bind="inputPT(segment.part).props"
              class="f-date-picker-literal"
              v-on="inputPT(segment.part).handlers"
            >
              {{ segment.value }}
            </DatePickerInput>
            <DatePickerInput
              v-else
              v-bind="inputPT(segment.part).props"
              class="f-date-picker-segment"
              v-on="inputPT(segment.part).handlers"
            >
              {{ segment.value }}
            </DatePickerInput>
          </slot>
        </template>
        <slot name="trigger" v-bind="ctx">
          <DatePickerTrigger v-bind="triggerPT.props" class="f-date-picker-trigger" v-on="triggerPT.handlers">
            <slot name="triggerIcon" v-bind="ctx">
              <Icon v-bind="triggerIconPT.props" v-on="triggerIconPT.handlers" />
            </slot>
          </DatePickerTrigger>
        </slot>
      </DatePickerField>
    </slot>
    <slot name="content" v-bind="{ ...ctx }">
      <DatePickerContent v-bind="contentPT.props" class="f-date-picker-content" v-on="contentPT.handlers">
        <DatePickerCalendar v-slot="{ weekDays, grid }" v-bind="calendarPT.props" class="f-calendar" v-on="calendarPT.handlers">
          <slot name="header" v-bind="{ ...ctx, weekDays, grid }">
            <DatePickerHeader v-bind="headerPT.props" class="f-calendar-header" v-on="headerPT.handlers">
              <slot name="prev" v-bind="{ ...ctx, weekDays, grid }">
                <DatePickerPrev v-bind="prevPT.props" class="f-calendar-nav" v-on="prevPT.handlers">
                  <slot name="prevIcon" v-bind="{ ...ctx, weekDays, grid }">
                    <Icon v-bind="prevIconPT.props" v-on="prevIconPT.handlers" />
                  </slot>
                </DatePickerPrev>
              </slot>
              <slot name="heading" v-bind="{ ...ctx, weekDays, grid }">
                <DatePickerHeading v-bind="headingPT.props" class="f-calendar-heading" v-on="headingPT.handlers" />
              </slot>
              <slot name="next" v-bind="{ ...ctx, weekDays, grid }">
                <DatePickerNext v-bind="nextPT.props" class="f-calendar-nav" v-on="nextPT.handlers">
                  <slot name="nextIcon" v-bind="{ ...ctx, weekDays, grid }">
                    <Icon v-bind="nextIconPT.props" v-on="nextIconPT.handlers" />
                  </slot>
                </DatePickerNext>
              </slot>
            </DatePickerHeader>
          </slot>
          <slot v-for="month in grid" name="grid" v-bind="{ ...ctx, weekDays, grid, month }">
            <DatePickerGrid :key="month.value.toString()" v-bind="gridPT.props" class="f-calendar-grid" v-on="gridPT.handlers">
              <slot name="gridHead" v-bind="{ ...ctx, weekDays, grid, month }">
                <DatePickerGridHead v-bind="gridHeadPT.props" v-on="gridHeadPT.handlers">
                  <DatePickerGridRow v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
                    <slot v-for="day in weekDays" name="headCell" v-bind="{ ...ctx, day }">
                      <DatePickerHeadCell :key="day" v-bind="headCellPT.props" class="f-calendar-head-cell" v-on="headCellPT.handlers">
                        {{ day }}
                      </DatePickerHeadCell>
                    </slot>
                  </DatePickerGridRow>
                </DatePickerGridHead>
              </slot>
              <slot name="gridBody" v-bind="{ ...ctx, weekDays, grid, month }">
                <DatePickerGridBody v-bind="gridBodyPT.props" v-on="gridBodyPT.handlers">
                  <DatePickerGridRow v-for="(week, i) in month.rows" :key="i" v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
                  <slot v-for="date in week" name="cell" v-bind="{ ...ctx, month, date }">
                    <DatePickerCell
                      :key="date.toString()"
                      v-bind="cellPT(date).props"
                      class="f-calendar-cell"
                      v-on="cellPT(date).handlers"
                    >
                      <slot name="cellTrigger" v-bind="{ ...ctx, month, date }">
                        <DatePickerCellTrigger
                          v-bind="cellTriggerPT(date, month.value).props"
                          class="f-calendar-cell-trigger"
                          v-on="cellTriggerPT(date, month.value).handlers"
                        />
                      </slot>
                    </DatePickerCell>
                  </slot>
                </DatePickerGridRow>
                </DatePickerGridBody>
              </slot>
            </DatePickerGrid>
          </slot>
        </DatePickerCalendar>
      </DatePickerContent>
    </slot>
  </DatePickerRoot>
</template>
