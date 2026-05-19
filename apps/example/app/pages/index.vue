<script setup lang="ts">
const workspace = accessExampleWorkspace();

await useAsyncData("workspace", () => workspace.init());

const { table } = useFakeTable();
const { chart1, chart2, chart3 } = useFakeCharts();
</script>

<template>
  <Workspace :workspace="workspace">
    <template #header>
      <Header class="f-example-header">
        <H1>{{ $t("Foundation Example") }}</H1>
        <P>{{ $t("A workspace demo with data table and chart widgets.") }}</P>
        <Anchor to="/preview" label="Data Preview →" />
        <Anchor to="/form" label="Data Form →" />
        <Group class="f-example-bar">
          <AppTheme />
          <AppColormode />
          <AppLocale />
          <AppAuth />
        </Group>
      </Header>
    </template>

    <template #main-table>
      <DataTableWidget :table="table">
        <template #cell:status="{ value }">
          <Chip :label="String(value)" />
        </template>
      </DataTableWidget>
    </template>

    <template #chart-breakdown>
      <DataChartWidget :chart="chart1" />
    </template>

    <template #chart-series>
      <DataChartWidget :chart="chart2" />
    </template>

    <template #chart-distribution>
      <DataChartWidget :chart="chart3" />
    </template>
  </Workspace>
</template>
