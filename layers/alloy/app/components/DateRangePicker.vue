<script lang="ts">
import type { DateRangePickerProps } from "../types/date-range-picker";
import type { DateRange, DateRangePickerInputProps } from "reka-ui";
import type { DateValue } from "@internationalized/date";
import {
  DateRangePickerRoot,
  DateRangePickerField,
  DateRangePickerInput,
  DateRangePickerTrigger,
  DateRangePickerContent,
  DateRangePickerCalendar,
  DateRangePickerHeader,
  DateRangePickerHeading,
  DateRangePickerGrid,
  DateRangePickerGridHead,
  DateRangePickerGridBody,
  DateRangePickerGridRow,
  DateRangePickerHeadCell,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
  DateRangePickerPrev,
  DateRangePickerNext,
} from "reka-ui";
</script>

<script setup lang="ts">
const {
  pt,
  minValue,
  maxValue,
  locale,
  disabled,
  numberOfMonths = 2,
} = defineProps<DateRangePickerProps>();

const model = defineModel<DateRange>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, minValue, maxValue, locale, disabled, numberOfMonths },
  handlers: { "update:modelValue": (v: DateRange) => { model.value = v; } },
}));
const contentPT = usePassthrough(pt?.content, {
  props: { sideOffset: 8 },
  handlers: {},
});
const headerPT = usePassthrough(pt?.header, { props: {}, handlers: {} });
const headingPT = usePassthrough(pt?.heading, { props: {}, handlers: {} });
const gridPT = usePassthrough(pt?.grid, { props: {}, handlers: {} });
const fieldPT = usePassthrough(pt?.field, { props: {}, handlers: {} });
const inputPT = (part: DateRangePickerInputProps["part"], type: "start" | "end") =>
  passthrough(pt?.input, { props: { part, type }, handlers: {} });
const separatorPT = usePassthrough(pt?.separator, { props: {}, handlers: {} });
const triggerPT = usePassthrough(pt?.trigger, { props: {}, handlers: {} });
const triggerIconPT = usePassthrough(pt?.triggerIcon, { props: { alias: "calendar" }, handlers: {} });
const calendarPT = usePassthrough(pt?.calendar, { props: {}, handlers: {} });
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
  minValue, maxValue, locale, disabled, numberOfMonths,
  model: model.value,
}));
</script>

<template>
  <DateRangePickerRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-date-range-picker"
    v-on="rootPT.handlers"
  >
    <slot name="field" v-bind="ctx">
      <DateRangePickerField v-slot="{ segments }" v-bind="fieldPT.props" class="f-date-picker-field" v-on="fieldPT.handlers">
        <template v-for="segment in segments.start" :key="'start-' + segment.part">
          <slot name="input" v-bind="{ ...ctx, segment, type: 'start' }">
            <DateRangePickerInput
              v-if="segment.part === 'literal'"
              v-bind="inputPT(segment.part, 'start').props"
              class="f-date-picker-literal"
              v-on="inputPT(segment.part, 'start').handlers"
            >
              {{ segment.value }}
            </DateRangePickerInput>
            <DateRangePickerInput
              v-else
              v-bind="inputPT(segment.part, 'start').props"
              class="f-date-picker-segment"
              v-on="inputPT(segment.part, 'start').handlers"
            >
              {{ segment.value }}
            </DateRangePickerInput>
          </slot>
        </template>
        <slot name="separator" v-bind="ctx">
          <Em v-bind="separatorPT.props" class="f-date-picker-separator" v-on="separatorPT.handlers">-</Em>
        </slot>
        <template v-for="segment in segments.end" :key="'end-' + segment.part">
          <slot name="input" v-bind="{ ...ctx, segment, type: 'end' }">
            <DateRangePickerInput
              v-if="segment.part === 'literal'"
              v-bind="inputPT(segment.part, 'end').props"
              class="f-date-picker-literal"
              v-on="inputPT(segment.part, 'end').handlers"
            >
              {{ segment.value }}
            </DateRangePickerInput>
            <DateRangePickerInput
              v-else
              v-bind="inputPT(segment.part, 'end').props"
              class="f-date-picker-segment"
              v-on="inputPT(segment.part, 'end').handlers"
            >
              {{ segment.value }}
            </DateRangePickerInput>
          </slot>
        </template>
        <slot name="trigger" v-bind="ctx">
          <DateRangePickerTrigger v-bind="triggerPT.props" class="f-date-picker-trigger" v-on="triggerPT.handlers">
            <slot name="triggerIcon" v-bind="ctx">
              <Icon v-bind="triggerIconPT.props" v-on="triggerIconPT.handlers" />
            </slot>
          </DateRangePickerTrigger>
        </slot>
      </DateRangePickerField>
    </slot>
    <slot name="content" v-bind="{ ...ctx }">
      <DateRangePickerContent v-bind="contentPT.props" class="f-date-picker-content" v-on="contentPT.handlers">
        <DateRangePickerCalendar v-slot="{ weekDays, grid }" v-bind="calendarPT.props" class="f-calendar f-calendar--range" v-on="calendarPT.handlers">
          <slot name="header" v-bind="{ ...ctx, weekDays, grid }">
            <DateRangePickerHeader v-bind="headerPT.props" class="f-calendar-header" v-on="headerPT.handlers">
              <slot name="prev" v-bind="{ ...ctx, weekDays, grid }">
                <DateRangePickerPrev v-bind="prevPT.props" class="f-calendar-nav" v-on="prevPT.handlers">
                  <slot name="prevIcon" v-bind="{ ...ctx, weekDays, grid }">
                    <Icon v-bind="prevIconPT.props" v-on="prevIconPT.handlers" />
                  </slot>
                </DateRangePickerPrev>
              </slot>
              <slot name="heading" v-bind="{ ...ctx, weekDays, grid }">
                <DateRangePickerHeading v-bind="headingPT.props" class="f-calendar-heading" v-on="headingPT.handlers" />
              </slot>
              <slot name="next" v-bind="{ ...ctx, weekDays, grid }">
                <DateRangePickerNext v-bind="nextPT.props" class="f-calendar-nav" v-on="nextPT.handlers">
                  <slot name="nextIcon" v-bind="{ ...ctx, weekDays, grid }">
                    <Icon v-bind="nextIconPT.props" v-on="nextIconPT.handlers" />
                  </slot>
                </DateRangePickerNext>
              </slot>
            </DateRangePickerHeader>
          </slot>
          <slot name="grids" v-bind="{ ...ctx, weekDays, grid }">
            <Group v-bind="gridsPT.props" class="f-calendar-grids" v-on="gridsPT.handlers">
              <slot v-for="month in grid" name="grid" v-bind="{ ...ctx, weekDays, grid, month }">
                <DateRangePickerGrid :key="month.value.toString()" v-bind="gridPT.props" class="f-calendar-grid" v-on="gridPT.handlers">
                  <slot name="gridHead" v-bind="{ ...ctx, weekDays, grid, month }">
                    <DateRangePickerGridHead v-bind="gridHeadPT.props" v-on="gridHeadPT.handlers">
                      <DateRangePickerGridRow v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
                        <slot v-for="day in weekDays" name="headCell" v-bind="{ ...ctx, day }">
                          <DateRangePickerHeadCell :key="day" v-bind="headCellPT.props" class="f-calendar-head-cell" v-on="headCellPT.handlers">
                            {{ day }}
                          </DateRangePickerHeadCell>
                        </slot>
                      </DateRangePickerGridRow>
                    </DateRangePickerGridHead>
                  </slot>
                  <slot name="gridBody" v-bind="{ ...ctx, weekDays, grid, month }">
                    <DateRangePickerGridBody v-bind="gridBodyPT.props" v-on="gridBodyPT.handlers">
                  <DateRangePickerGridRow v-for="(week, i) in month.rows" :key="i" v-bind="gridRowPT.props" class="f-calendar-row" v-on="gridRowPT.handlers">
                    <slot v-for="date in week" name="cell" v-bind="{ ...ctx, month, date }">
                      <DateRangePickerCell
                        :key="date.toString()"
                        v-bind="cellPT(date).props"
                        class="f-calendar-cell"
                        v-on="cellPT(date).handlers"
                      >
                        <slot name="cellTrigger" v-bind="{ ...ctx, month, date }">
                          <DateRangePickerCellTrigger
                            v-bind="cellTriggerPT(date, month.value).props"
                            class="f-calendar-cell-trigger"
                            v-on="cellTriggerPT(date, month.value).handlers"
                          />
                        </slot>
                      </DateRangePickerCell>
                    </slot>
                  </DateRangePickerGridRow>
                    </DateRangePickerGridBody>
                  </slot>
                </DateRangePickerGrid>
              </slot>
            </Group>
          </slot>
        </DateRangePickerCalendar>
      </DateRangePickerContent>
    </slot>
  </DateRangePickerRoot>
</template>
