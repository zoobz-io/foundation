<script lang="ts">
import { today, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import type { DateRange } from "reka-ui";
import type { DateFiltersProps } from "../types/date-filters";
</script>

<script setup lang="ts">
const { fields, addFilter, removeFilter: _removeFilter, pt } = defineProps<DateFiltersProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const filters = defineModel<DateFilter[]>({ default: () => [] });
const open = ref(false);
const step = ref<1 | 2 | 3>(1);
const selectedField = ref("");
const selectedOperator = ref<DateFilterOperator | "">("");
const selectedDate = ref<DateValue>();
const selectedRange = ref<DateRange>();

const activeCount = computed(() => filters.value.length);

const fieldGroups = computed(() => [{
  key: "fields",
  items: fields.map((f) => ({ value: f.key, label: f.label })),
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

const isFormValid = computed(() => {
  if (selectedOperator.value === "between") {
    return !!(selectedRange.value?.start && selectedRange.value?.end);
  }
  return !!selectedDate.value;
});

const resetStepper = () => {
  open.value = false;
  step.value = 1;
  selectedField.value = "";
  selectedOperator.value = "";
  selectedDate.value = undefined;
  selectedRange.value = undefined;
};

const applyFilter = () => {
  if (!selectedField.value || !selectedOperator.value) return;

  let filter: DateFilter;
  if (selectedOperator.value === "between") {
    if (!selectedRange.value?.start || !selectedRange.value?.end) return;
    filter = {
      field: selectedField.value,
      operator: selectedOperator.value,
      value: DateUtils.serialize(selectedRange.value.start),
      endValue: DateUtils.serialize(selectedRange.value.end),
    };
  } else {
    if (!selectedDate.value) return;
    filter = {
      field: selectedField.value,
      operator: selectedOperator.value,
      value: DateUtils.serialize(selectedDate.value),
    };
  }

  addFilter(filter);
  resetStepper();
};

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

const fieldLabel = computed(() =>
  fields.find((f) => f.key === selectedField.value)?.label ?? "Field",
);

const operatorLabel = computed(() => {
  if (!selectedOperator.value) return "Operator";
  return selectedOperator.value.charAt(0).toUpperCase() + selectedOperator.value.slice(1);
});

const valueLabel = computed(() => {
  if (selectedOperator.value === "between") {
    if (!selectedRange.value?.start || !selectedRange.value?.end) return "Value";
    return `${DateUtils.format(selectedRange.value.start)},${DateUtils.format(selectedRange.value.end)}`;
  }
  if (!selectedDate.value) return "Value";
  return DateUtils.format(selectedDate.value);
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
          start: DateUtils.deserialize(last.value),
          end: DateUtils.deserialize(last.endValue),
        };
        selectedDate.value = undefined;
      } else {
        selectedDate.value = DateUtils.deserialize(last.value);
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

const popoverPT = usePassthrough(pt?.popover, () => ({
  props: { open: open.value, align: "end" as const },
  handlers: { "update:open": (v: boolean) => { open.value = v; } },
}));
const triggerPT = usePassthrough(pt?.trigger, () => ({
  props: { icon: "calendar" as IconAlias, badge: activeCount.value > 0 ? "" : undefined },
  handlers: {},
}));
const rootPT = usePassthrough(pt?.root, { props: {}, handlers: {} });
const stepperPT = usePassthrough(pt?.stepper, { props: {}, handlers: {} });
const stepSeparatorPT = usePassthrough(pt?.stepSeparator, { props: { alias: "chevron-right" }, handlers: {} });
const fieldCommandPT = usePassthrough(pt?.fieldCommand, () => ({
  props: { groups: fieldGroups.value, placeholder: "Search fields...", selected: fieldSelected.value },
  handlers: { select: onFieldSelect, "update:selected": (v: Set<string>) => { fieldSelected.value = v; } },
}));
const operatorCommandPT = usePassthrough(pt?.operatorCommand, () => ({
  props: { groups: operatorGroups.value, placeholder: "Search operators...", selected: operatorSelected.value },
  handlers: { select: onOperatorSelect, "update:selected": (v: Set<string>) => { operatorSelected.value = v; } },
}));
const calendarWrapperPT = usePassthrough(pt?.calendarWrapper, { props: {}, handlers: {} });
const calendarPTProp = usePassthrough(pt?.calendar, () => ({
  props: { modelValue: selectedDate.value, maxValue: today(getLocalTimeZone()) },
  handlers: { "update:modelValue": (v: DateValue | undefined) => { selectedDate.value = v; } },
}));
const rangeCalendarPTProp = usePassthrough(pt?.rangeCalendar, () => ({
  props: { modelValue: selectedRange.value, maxValue: today(getLocalTimeZone()) },
  handlers: { "update:modelValue": (v: DateRange) => { selectedRange.value = v; } },
}));
const actionsPT = usePassthrough(pt?.actions, { props: {}, handlers: {} });
const applyButtonPT = usePassthrough(pt?.applyButton, () => ({
  props: { type: "button" as const, disabled: !isFormValid.value },
  handlers: { click: () => applyFilter() },
}));

const ctx = computed(() => ({ fields, filters: filters.value, activeCount: activeCount.value }));
</script>

<template>
  <slot name="popover" v-bind="ctx">
    <Popover v-bind="popoverPT.props" v-on="popoverPT.handlers">
      <template #trigger>
        <slot name="trigger" v-bind="ctx">
          <Fab v-bind="triggerPT.props" v-on="triggerPT.handlers" />
        </slot>
      </template>
      <template #content>
        <slot name="root" v-bind="ctx">
          <Group ref="el" v-bind="rootPT.props" class="f-date-filters" v-on="rootPT.handlers">
            <slot name="stepper" v-bind="ctx">
              <Group v-bind="stepperPT.props" class="f-date-filters-stepper" v-on="stepperPT.handlers">
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
                <Icon v-bind="stepSeparatorPT.props" class="f-date-filters-step-separator" v-on="stepSeparatorPT.handlers" />
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
                <Icon v-bind="stepSeparatorPT.props" class="f-date-filters-step-separator" v-on="stepSeparatorPT.handlers" />
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
            </slot>

            <slot name="fieldCommand" v-bind="ctx">
              <Command
                v-if="step === 1"
                v-bind="fieldCommandPT.props"
                v-on="fieldCommandPT.handlers"
              />
            </slot>

            <slot name="operatorCommand" v-bind="ctx">
              <Command
                v-if="step === 2"
                v-bind="operatorCommandPT.props"
                v-on="operatorCommandPT.handlers"
              />
            </slot>

            <slot name="calendarWrapper" v-bind="ctx">
              <Group v-if="step === 3" v-bind="calendarWrapperPT.props" class="f-date-filters-calendar" v-on="calendarWrapperPT.handlers">
                <slot name="calendar" v-bind="ctx">
                  <RangeCalendar v-if="selectedOperator === 'between'" v-bind="rangeCalendarPTProp.props" v-on="rangeCalendarPTProp.handlers" />
                  <Calendar v-else v-bind="calendarPTProp.props" v-on="calendarPTProp.handlers" />
                </slot>
                <slot name="actions" v-bind="ctx">
                  <Group v-bind="actionsPT.props" class="f-date-filters-actions" v-on="actionsPT.handlers">
                    <slot name="applyButton" v-bind="ctx">
                      <Button v-bind="applyButtonPT.props" v-on="applyButtonPT.handlers">Apply</Button>
                    </slot>
                  </Group>
                </slot>
              </Group>
            </slot>
          </Group>
        </slot>
      </template>
    </Popover>
  </slot>
</template>
