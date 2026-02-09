<script lang="ts">

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];}
</script>

<script setup lang="ts" generic="T">
const { columns, data } = defineProps<DataTableProps<T>>();
</script>

<template>
  <Table>
    <Thead v-if="columns">
      <Tr>
        <Th v-for="col in columns" :key="col.key">
          <slot name="header" :column="col">
            {{ col.label }}
          </slot>
        </Th>
      </Tr>
    </Thead>
    <slot name="thead" />
    <Tbody v-if="data">
      <Tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <Td v-for="col in columns" :key="col.key">
          <slot name="cell" :row="row" :column="col" :value="row[col.key]">
            {{ row[col.key] }}
          </slot>
        </Td>
      </Tr>
    </Tbody>
    <slot name="tbody" />
    <slot />
  </Table>
</template>
