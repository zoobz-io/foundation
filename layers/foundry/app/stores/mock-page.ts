type MockPageWidgets = {
  "main-table": DataTableSnapshot;
  [key: string]: unknown;
};

type MockPageConfig = BasePageConfig<MockPageWidgets>;

export const accessMockPageStore = createPageStore<MockPageConfig>("mock", {
  defaultConfig: {
    layout: {
      type: "grid",
      columns: 3,
      rows: 3,
      slots: [
        { id: "main-table", position: [0, 0], span: [2, 2] },
        { id: "sidebar", position: [2, 0], span: [1, 2] },
        { id: "bottom-bar", position: [0, 2], span: [3, 1] },
      ],
    },
    widgets: {
      "main-table": {
        query: "",
        keywords: "",
        match: "all",
        page: 1,
        pageSize: 10,
        selectedFacets: [],
        dateFilters: [],
        sortField: null,
        sortDirection: "asc",
      },
    },
  },
  persistence: {
    load: async (pageId) => {
      const raw = localStorage.getItem(`page-${pageId}`);
      return raw ? JSON.parse(raw) : null;
    },
    save: async (pageId, config) => {
      localStorage.setItem(`page-${pageId}`, JSON.stringify(config));
    },
  },
  autoSave: { debounceMs: 1000 },
  onInit: (nuxt, config, save) => {
    nuxt.hook("widget:table:snapshot", ({ id, snapshot }) => {
      if (id in config.value.widgets) {
        config.value.widgets[id as keyof MockPageWidgets] = snapshot;
        save();
      }
    });
  },
});
