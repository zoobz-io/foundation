<script setup lang="ts">
const workspace = accessExampleWorkspace();

await useAsyncData("workspace", () => workspace.init());

const { table } = useFakeTable();
</script>

<template>
  <Workspace :workspace="workspace">
    <template #header>
      <Header class="f-example-header">
        <H1>Foundation Example</H1>
        <P>A workspace demo with a data table widget.</P>
      </Header>
    </template>

    <template #main-table>
      <DataTableWidget :table="table">
        <template #cell:status="{ value }">
          <Chip :label="String(value)" />
        </template>
      </DataTableWidget>
    </template>

    <template #sidebar>
      <Card class="f-example-sidebar">
        <H3>Sidebar</H3>
        <P>This slot is available for any widget.</P>
      </Card>
    </template>
  </Workspace>
</template>
