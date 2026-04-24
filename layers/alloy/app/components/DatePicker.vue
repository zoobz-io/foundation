<script lang="ts">
import type { DatePickerProps } from "../types/date-picker";
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

const rootPT = usePassthrough(pt?.root, {
  props: { minValue, maxValue, locale, disabled, granularity, isDateDisabled },
});
const contentPT = usePassthrough(pt?.content, {
  props: { sideOffset: 8 },
});
const headerPT = usePassthrough(pt?.header, {});
const headingPT = usePassthrough(pt?.heading, {});
const gridPT = usePassthrough(pt?.grid, {});
const cellPT = usePassthrough(pt?.cell, {});
const cellTriggerPT = usePassthrough(pt?.cellTrigger, {});
const prevPT = usePassthrough(pt?.prev, {});
const nextPT = usePassthrough(pt?.next, {});

const ctx = computed(() => ({
  minValue, maxValue, locale, disabled, granularity, isDateDisabled,
  model: model.value,
}));
</script>

<template>
  <DatePickerRoot
    ref="el"
    v-model="model"
    v-bind="rootPT.props"
    class="f-date-picker"
    v-on="rootPT.handlers"
  >
    <DatePickerField v-slot="{ segments }" class="f-date-picker-field">
      <template v-for="segment in segments" :key="segment.part">
        <DatePickerInput
          v-if="segment.part === 'literal'"
          :part="segment.part"
          class="f-date-picker-literal"
        >
          {{ segment.value }}
        </DatePickerInput>
        <DatePickerInput
          v-else
          :part="segment.part"
          class="f-date-picker-segment"
        >
          {{ segment.value }}
        </DatePickerInput>
      </template>
      <DatePickerTrigger class="f-date-picker-trigger">
        <Icon alias="calendar" />
      </DatePickerTrigger>
    </DatePickerField>
    <slot name="content" v-bind="{ ...ctx }">
      <DatePickerContent v-bind="contentPT.props" class="f-date-picker-content" v-on="contentPT.handlers">
        <DatePickerCalendar v-slot="{ weekDays, grid }" class="f-calendar">
          <slot name="header" v-bind="{ ...ctx, weekDays, grid }">
            <DatePickerHeader v-bind="headerPT.props" class="f-calendar-header" v-on="headerPT.handlers">
              <slot name="prev" v-bind="{ ...ctx, weekDays, grid }">
                <DatePickerPrev v-bind="prevPT.props" class="f-calendar-nav" v-on="prevPT.handlers">
                  <Icon alias="chevron-left" />
                </DatePickerPrev>
              </slot>
              <slot name="heading" v-bind="{ ...ctx, weekDays, grid }">
                <DatePickerHeading v-bind="headingPT.props" class="f-calendar-heading" v-on="headingPT.handlers" />
              </slot>
              <slot name="next" v-bind="{ ...ctx, weekDays, grid }">
                <DatePickerNext v-bind="nextPT.props" class="f-calendar-nav" v-on="nextPT.handlers">
                  <Icon alias="chevron-right" />
                </DatePickerNext>
              </slot>
            </DatePickerHeader>
          </slot>
          <slot v-for="month in grid" name="grid" v-bind="{ ...ctx, weekDays, grid, month }">
            <DatePickerGrid :key="month.value.toString()" v-bind="gridPT.props" class="f-calendar-grid" v-on="gridPT.handlers">
              <DatePickerGridHead>
                <DatePickerGridRow class="f-calendar-row">
                  <DatePickerHeadCell v-for="day in weekDays" :key="day" class="f-calendar-head-cell">
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow v-for="(week, i) in month.rows" :key="i" class="f-calendar-row">
                  <slot v-for="date in week" name="cell" v-bind="{ ...ctx, month, date }">
                    <DatePickerCell
                      :key="date.toString()"
                      v-bind="cellPT.props"
                      :date="date"
                      class="f-calendar-cell"
                      v-on="cellPT.handlers"
                    >
                      <slot name="cellTrigger" v-bind="{ ...ctx, month, date }">
                        <DatePickerCellTrigger
                          v-bind="cellTriggerPT.props"
                          :day="date"
                          :month="month.value"
                          class="f-calendar-cell-trigger"
                          v-on="cellTriggerPT.handlers"
                        />
                      </slot>
                    </DatePickerCell>
                  </slot>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </slot>
        </DatePickerCalendar>
      </DatePickerContent>
    </slot>
  </DatePickerRoot>
</template>
