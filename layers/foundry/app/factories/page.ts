import type {
  BasePageConfig,
  PageFactoryConfig,
  PageLayoutConfig,
  PageSlot,
} from "../types/page";

export const createPageStore = <C extends BasePageConfig = BasePageConfig>(
  id: string,
  factoryConfig: PageFactoryConfig<C>,
) => {
  return defineStore(`page-${id}`, () => {
    const config = ref<C>(factoryConfig.defaultConfig) as Ref<C>;
    const layout = computed<PageLayoutConfig>({
      get: () => config.value.layout,
      set: (v) => { config.value = { ...config.value, layout: v }; },
    });
    const loading = ref(false);

    // Persistence
    let saveTimer: ReturnType<typeof setTimeout> | null = null;
    const debounceMs = typeof factoryConfig.autoSave === "object"
      ? factoryConfig.autoSave.debounceMs
      : 500;

    const save = async () => {
      if (!factoryConfig.persistence) return;
      await factoryConfig.persistence.save(id, config.value);
    };

    const debouncedSave = () => {
      if (!factoryConfig.autoSave) return;
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => save(), debounceMs);
    };

    const restore = async () => {
      if (!factoryConfig.persistence) return;
      const loaded = await factoryConfig.persistence.load(id);
      if (loaded) {
        config.value = loaded;
      } else {
        await factoryConfig.persistence.save(id, config.value);
      }
    };

    const init = async () => {
      loading.value = true;
      try {
        await restore();
        if (factoryConfig.onInit) {
          factoryConfig.onInit(useNuxtApp(), config, save);
        }
      } finally {
        loading.value = false;
      }
    };

    // Layout-aware style helpers
    const gridStyle = computed((): Record<string, string> => {
      const l = layout.value;
      if (l.type === "grid") {
        return {
          display: "grid",
          "grid-template-columns": `repeat(${l.columns}, 1fr)`,
          "grid-template-rows": `repeat(${l.rows}, 1fr)`,
        };
      }
      if (l.type === "stack") {
        return {
          display: "flex",
          "flex-direction": "column",
        };
      }
      if (l.type === "split") {
        return {
          display: "grid",
          "grid-template-columns": `${l.ratio}fr ${1 - l.ratio}fr`,
        };
      }
      return {};
    });

    const slotStyle = (slot: PageSlot): Record<string, string> => {
      const l = layout.value;
      if (l.type === "grid") {
        return {
          "grid-column": `${slot.position[0] + 1} / span ${slot.span[0]}`,
          "grid-row": `${slot.position[1] + 1} / span ${slot.span[1]}`,
        };
      }
      return {};
    };

    return {
      config,
      layout,
      loading,
      gridStyle,
      slotStyle,
      init,
      save,
      debouncedSave,
    };
  });
};
