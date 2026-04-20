import type { PageState } from "../types/page";

export const useMockPage = (): PageState => {
  const store = accessMockPageStore();
  const { config, layout, loading, gridStyle } = storeToRefs(store);

  return {
    config,
    layout,
    loading,
    gridStyle,
    slotStyle: store.slotStyle,
    init: store.init,
    save: store.save,
  };
};
