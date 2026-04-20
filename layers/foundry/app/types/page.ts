/**
 * A slot definition within the page layout.
 */
export interface PageSlot {
  id: string;
  position: [column: number, row: number];
  span: [columns: number, rows: number];
}

/**
 * Layout discriminated union.
 */
export interface GridLayout {
  type: "grid";
  columns: number;
  rows: number;
  slots: PageSlot[];
}

export interface StackLayout {
  type: "stack";
  slots: PageSlot[];
}

export interface SplitLayout {
  type: "split";
  ratio: number;
  slots: [PageSlot, PageSlot];
}

export type PageLayoutConfig = GridLayout | StackLayout | SplitLayout;

/**
 * Base page config — generic over widget state record.
 * Consumer defines W as { slotId: SnapshotType } for each widget.
 */
export interface BasePageConfig<W extends Record<string, unknown> = Record<string, unknown>> {
  layout: PageLayoutConfig;
  widgets: W;
}

/**
 * Persistence adapter interface.
 * Consumer provides the implementation (localStorage, API, etc.).
 */
export interface PagePersistence<C extends BasePageConfig> {
  load: (pageId: string) => Promise<C | null>;
  save: (pageId: string, config: C) => Promise<void>;
}

/**
 * Widget persistence contract.
 * Widgets that participate in page persistence implement this.
 */
export interface PersistableWidget<S> {
  getSnapshot: () => S;
  restoreSnapshot: (snapshot: S) => void;
}

/**
 * Factory config passed to createPageStore.
 */
export interface PageFactoryConfig<C extends BasePageConfig = BasePageConfig> {
  defaultConfig: C;
  persistence?: PagePersistence<C>;
  autoSave?: boolean | { debounceMs: number };
  onInit?: (nuxt: ReturnType<typeof useNuxtApp>, config: Ref<C>, save: () => Promise<void>) => void;
}

/**
 * The state interface that page composables return and Page component accepts.
 */
export interface PageState<C extends BasePageConfig = BasePageConfig> {
  layout: Ref<PageLayoutConfig>;
  loading: Ref<boolean>;
  config: Ref<C>;

  // Style helpers
  gridStyle: ComputedRef<Record<string, string>>;
  slotStyle: (slot: PageSlot) => Record<string, string>;

  // Lifecycle
  init: () => Promise<void>;
  save: () => Promise<void>;
}

/**
 * Discriminated union of widget snapshot events.
 * Each member pairs a literal slot ID with its corresponding snapshot type.
 */
export type WidgetSnapshotEvent<W extends Record<string, unknown>> = {
  [K in keyof W]: { id: K; snapshot: W[K] };
}[keyof W];

/**
 * Page component passthrough.
 */
export type PagePassthrough = {
  root?: Passthrough<GroupProps>;
  header?: Passthrough<HeaderProps>;
  grid?: Passthrough<GroupProps>;
  footer?: Passthrough<FooterProps>;
};

/**
 * Page component props.
 */
export type PageProps = {
  store: PageState;
  pt?: PagePassthrough;
};
