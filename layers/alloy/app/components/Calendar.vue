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

const rootPT = usePassthrough(pt?.root, {
  props: { minValue, maxValue, locale, numberOfMonths, fixedWeeks, disabled, isDateDisabled, isDateUnavailable },
});
const headerPT = usePassthrough(pt?.header, {});
const headingPT = usePassthrough(pt?.heading, {});
const gridPT = usePassthrough(pt?.grid, {});
const cellPT = usePassthrough(pt?.cell, {});
const cellTriggerPT = usePassthrough(pt?.cellTrigger, {});
const prevPT = usePassthrough(pt?.prev, {});
const nextPT = usePassthrough(pt?.next, {});

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
    v-model="model"
    v-bind="rootPT.props"
    class="f-calendar"
    v-on="rootPT.handlers"
  >
    <slot name="header" v-bind="{ ...ctx, weekDays, grid }">
      <CalendarHeader v-bind="headerPT.props" class="f-calendar-header" v-on="headerPT.handlers">
        <slot name="prev" v-bind="{ ...ctx, weekDays, grid }">
          <CalendarPrev v-bind="prevPT.props" class="f-calendar-nav" v-on="prevPT.handlers">
            <Icon alias="chevron-left" />
          </CalendarPrev>
        </slot>
        <slot name="heading" v-bind="{ ...ctx, weekDays, grid }">
          <CalendarHeading v-bind="headingPT.props" class="f-calendar-heading" v-on="headingPT.handlers" />
        </slot>
        <slot name="next" v-bind="{ ...ctx, weekDays, grid }">
          <CalendarNext v-bind="nextPT.props" class="f-calendar-nav" v-on="nextPT.handlers">
            <Icon alias="chevron-right" />
          </CalendarNext>
        </slot>
      </CalendarHeader>
    </slot>
    <slot v-for="month in grid" name="grid" v-bind="{ ...ctx, weekDays, grid, month }">
      <CalendarGrid :key="month.value.toString()" v-bind="gridPT.props" class="f-calendar-grid" v-on="gridPT.handlers">
        <CalendarGridHead>
          <CalendarGridRow class="f-calendar-row">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="f-calendar-head-cell"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(week, i) in month.rows"
            :key="i"
            class="f-calendar-row"
          >
            <slot v-for="date in week" name="cell" v-bind="{ ...ctx, month, date }">
              <CalendarCell
                :key="date.toString()"
                v-bind="cellPT.props"
                :date="date"
                class="f-calendar-cell"
                v-on="cellPT.handlers"
              >
                <slot name="cellTrigger" v-bind="{ ...ctx, month, date }">
                  <CalendarCellTrigger
                    v-bind="cellTriggerPT.props"
                    :day="date"
                    :month="month.value"
                    class="f-calendar-cell-trigger"
                    v-on="cellTriggerPT.handlers"
                  />
                </slot>
              </CalendarCell>
            </slot>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </slot>
  </CalendarRoot>
</template>
