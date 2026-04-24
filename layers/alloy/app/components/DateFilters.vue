<script lang="ts">
import type { DateValue } from "@internationalized/date";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import type { DateFiltersProps, DateFilter, DateFilterOperator } from "../types/date-filters";
</script>

<script setup lang="ts">
const { fields, addFilter, removeFilter: _removeFilter, pt } = defineProps<DateFiltersProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const filters = defineModel<DateFilter[]>({ default: () => [] });
const open = ref(false);

// Stepper state
const step = ref<1 | 2 | 3>(1);
const selectedField = ref("");
const selectedOperator = ref<DateFilterOperator | "">("");
const selectedDate = ref<DateValue>();
const selectedRange = ref<DateRange>();

const activeCount = computed(() => filters.value.length);

// Step 1 — field groups for Command
const fieldGroups = computed(() => [{
  key: "fields",
  items: fields.map((f) => ({
    value: f.key,
    label: f.label,
  })),
}]);

const fieldSelected = ref<Set<string>>(new Set());

const onFieldSelect = (value: string) => {
  selectedField.value = value;
  selectedOperator.value = "";
  selectedDate.value = undefined;
  selectedRange.value = undefined;
  fieldSelected.value = new Set();
  step.value = 2;
};

// Step 2 — operator groups for Command
const operatorGroups = computed(() => [{
  key: "operators",
  items: [
    { value: "after", label: "After" },
    { value: "before", label: "Before" },
    { value: "between", label: "Between" },
  ],
}]);

const operatorSelected = ref<Set<string>>(new Set());

const onOperatorSelect = (value: string) => {
  selectedOperator.value = value as DateFilterOperator;
  selectedDate.value = undefined;
  selectedRange.value = undefined;
  operatorSelected.value = new Set();
  step.value = 3;
};

// Step 3 — calendar
const dateValueToDate = (dv: DateValue): Date => dv.toDate("UTC");

const dateToCalendarDate = (d: Date): CalendarDate =>
  new CalendarDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());

const isFormValid = computed(() => {
  if (selectedOperator.value === "between") {
    return !!(selectedRange.value?.start && selectedRange.value?.end);
  }
  return !!selectedDate.value;
});

const applyFilter = () => {
  if (!selectedField.value || !selectedOperator.value) return;

  let filter: DateFilter;
  if (selectedOperator.value === "between") {
    if (!selectedRange.value?.start || !selectedRange.value?.end) return;
    filter = {
      field: selectedField.value,
      operator: selectedOperator.value,
      value: dateValueToDate(selectedRange.value.start),
      endValue: dateValueToDate(selectedRange.value.end),
    };
  } else {
    if (!selectedDate.value) return;
    filter = {
      field: selectedField.value,
      operator: selectedOperator.value,
      value: dateValueToDate(selectedDate.value),
    };
  }

  addFilter(filter);
  resetStepper();
};

// Navigation
const goToStep = (target: 1 | 2 | 3) => {
  if (target === step.value) return;
  if (target === 1) {
    selectedField.value = "";
    selectedOperator.value = "";
    selectedDate.value = undefined;
    selectedRange.value = undefined;
    step.value = 1;
  } else if (target === 2 && selectedField.value) {
    selectedOperator.value = "";
    selectedDate.value = undefined;
    selectedRange.value = undefined;
    step.value = 2;
  }
};

const resetStepper = () => {
  open.value = false;
  step.value = 1;
  selectedField.value = "";
  selectedOperator.value = "";
  selectedDate.value = undefined;
  selectedRange.value = undefined;
};

// Step display
const fieldLabel = computed(() =>
  fields.find((f) => f.key === selectedField.value)?.label ?? "Field",
);

const operatorLabel = computed(() => {
  if (!selectedOperator.value) return "Operator";
  return selectedOperator.value.charAt(0).toUpperCase() + selectedOperator.value.slice(1);
});

const formatDateValue = (dv: DateValue) =>
  `${dv.year}-${String(dv.month).padStart(2, "0")}-${String(dv.day).padStart(2, "0")}`;

const valueLabel = computed(() => {
  if (selectedOperator.value === "between") {
    if (!selectedRange.value?.start || !selectedRange.value?.end) return "Value";
    return `${formatDateValue(selectedRange.value.start)},${formatDateValue(selectedRange.value.end)}`;
  }
  if (!selectedDate.value) return "Value";
  return formatDateValue(selectedDate.value);
});

watch(open, (isOpen) => {
  if (isOpen && filters.value.length) {
    const last = filters.value[filters.value.length - 1]!;
    selectedField.value = last.field;
    selectedOperator.value = last.operator;
    step.value = 3;
    nextTick(() => {
      if (last.operator === "between" && last.endValue) {
        selectedRange.value = {
          start: dateToCalendarDate(last.value),
          end: dateToCalendarDate(last.endValue),
        };
        selectedDate.value = undefined;
      } else {
        selectedDate.value = dateToCalendarDate(last.value);
        selectedRange.value = undefined;
      }
    });
  } else if (!isOpen) {
    step.value = 1;
    selectedField.value = "";
    selectedOperator.value = "";
    selectedDate.value = undefined;
    selectedRange.value = undefined;
  }
});

const rootPT = usePassthrough(pt?.root, {});

const ctx = computed(() => ({ fields, filters: filters.value, activeCount: activeCount.value }));
</script>

<template>
  <Popover v-model:open="open" align="end">
    <slot name="trigger" v-bind="ctx">
      <Fab icon="calendar" :badge="activeCount > 0 ? '' : undefined" />
    </slot>
    <template #content>
      <slot v-bind="ctx">
        <Group ref="el" v-bind="rootPT.props" class="f-date-filters" v-on="rootPT.handlers">
          <!-- Stepper header -->
          <Group class="f-date-filters-stepper">
            <button
              type="button"
              :tabindex="step === 1 ? -1 : 0"
              :class="[
                'f-date-filters-step',
                { 'f-date-filters-step--active': step === 1 },
                { 'f-date-filters-step--completed': selectedField },
                { 'f-date-filters-step--disabled': !selectedField && step !== 1 },
              ]"
              @click="goToStep(1)"
            >
              {{ fieldLabel }}
            </button>
            <Icon alias="chevron-right" class="f-date-filters-step-separator" />
            <button
              type="button"
              :tabindex="step === 2 ? -1 : 0"
              :class="[
                'f-date-filters-step',
                { 'f-date-filters-step--active': step === 2 },
                { 'f-date-filters-step--completed': selectedOperator },
                { 'f-date-filters-step--disabled': !selectedOperator && step !== 2 },
              ]"
              :disabled="!selectedField"
              @click="goToStep(2)"
            >
              {{ operatorLabel }}
            </button>
            <Icon alias="chevron-right" class="f-date-filters-step-separator" />
            <button
              type="button"
              :class="[
                'f-date-filters-step',
                { 'f-date-filters-step--active': step === 3 },
                { 'f-date-filters-step--disabled': step !== 3 },
              ]"
              disabled
            >
              {{ valueLabel }}
            </button>
          </Group>

          <!-- Step 1: Field -->
          <Command
            v-if="step === 1"
            v-model:selected="fieldSelected"
            :groups="fieldGroups"
            placeholder="Search fields..."
            @select="onFieldSelect"
          />

          <!-- Step 2: Operator -->
          <Command
            v-if="step === 2"
            v-model:selected="operatorSelected"
            :groups="operatorGroups"
            placeholder="Search operators..."
            @select="onOperatorSelect"
          />

          <!-- Step 3: Calendar -->
          <Group v-if="step === 3" class="f-date-filters-calendar">
            <RangeCalendar v-if="selectedOperator === 'between'" v-model="selectedRange" :max-value="today(getLocalTimeZone())" />
            <Calendar v-else v-model="selectedDate" :max-value="today(getLocalTimeZone())" />
            <Group class="f-date-filters-actions">
              <Button type="button" :disabled="!isFormValid" @click="applyFilter">Apply</Button>
            </Group>
          </Group>
        </Group>
      </slot>
    </template>
  </Popover>
</template>
