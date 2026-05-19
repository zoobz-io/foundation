<script setup lang="ts">
const workspace = accessPreviewWorkspace();

await useAsyncData("preview-workspace", () => workspace.init());

const { preview } = useFakePreview();
const { docDeck, noteDeck } = useFakeDecks();
</script>

<template>
  <Workspace :workspace="workspace">
    <template #header>
      <Header class="f-example-header">
        <H1>{{ $t("Data Preview") }}</H1>
        <P>{{ $t("A workspace demo with the data preview widget and data deck feeds.") }}</P>
        <Anchor to="/" label="← Foundation Example" />
      </Header>
    </template>

    <template #preview>
      <DataPreviewWidget :preview="preview" />
    </template>

    <template #doc-deck>
      <DataDeckWidget :deck="docDeck">
        <template #card="{ item }">
          <Group class="f-example-card">
            <Group class="f-example-card-header">
              <Span class="f-example-card-title">{{ item.title }}</Span>
              <Chip :label="item.status" />
            </Group>
            <Group class="f-example-card-meta">
              <Span class="f-example-card-category">{{ item.category }}</Span>
              <Span class="f-example-card-date">{{ new Date(item.created).toLocaleDateString() }}</Span>
            </Group>
          </Group>
        </template>
      </DataDeckWidget>
    </template>

    <template #note-deck>
      <DataDeckWidget :deck="noteDeck">
        <template #card="{ item }">
          <Group class="f-example-card f-example-card--compact">
            <Span class="f-example-card-title">{{ item.title }}</Span>
            <Span class="f-example-card-date">{{ new Date(item.created).toLocaleTimeString() }}</Span>
          </Group>
        </template>
      </DataDeckWidget>
    </template>
  </Workspace>
</template>
