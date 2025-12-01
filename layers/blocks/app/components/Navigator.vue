<script lang="ts">
export interface NavigatorLink {
  label: string;
  to: string;
  icon?: IconAlias;
}

export interface NavigatorMenu {
  label: string;
  value: string;
  icon?: IconAlias;
  children: NavigatorItem[];
}

export type NavigatorItem = NavigatorLink | NavigatorMenu;

export interface NavigatorProps {
  items: NavigatorItem[];
  orientation?: "horizontal" | "vertical";
  indicator?: boolean;
  delayDuration?: number;
  skipDelayDuration?: number;
  featured?: NavigatorLink;
  tokens?: Tokens<
    | "navigator-root"
    | "navigator-list"
    | "navigator-item"
    | "navigator-trigger"
    | "navigator-link"
    | "navigator-content"
    | "navigator-viewport"
    | "navigator-viewport-wrapper"
    | "navigator-indicator"
    | "navigator-grid"
    | "navigator-card"
    | "navigator-featured"
  >;
}

const isMenu = (item: NavigatorItem): item is NavigatorMenu => {
  return "children" in item;
};
</script>

<script setup lang="ts">
const {
  items,
  orientation = "horizontal",
  indicator = false,
  delayDuration = 0,
  skipDelayDuration = 0,
  featured,
  tokens,
} = defineProps<NavigatorProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <NavigationMenuRoot
    :orientation="orientation"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :style="styles['navigator-root']"
    class="f-navigator-root"
  >
    <NavigationMenuList
      :style="styles['navigator-list']"
      class="f-navigator-list"
    >
      <NavigationMenuItem
        v-for="item in items"
        :key="isMenu(item) ? item.value : item.to"
        :value="isMenu(item) ? item.value : undefined"
        :style="styles['navigator-item']"
        class="f-navigator-item"
      >
        <!-- Menu with children -->
        <template v-if="isMenu(item)">
          <NavigationMenuTrigger
            :style="styles['navigator-trigger']"
            class="f-navigator-trigger"
          >
            <slot name="trigger" :item="item">
              <Icon v-if="item.icon" :alias="item.icon" />
              {{ item.label }}
            </slot>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            :style="styles['navigator-content']"
            class="f-navigator-content"
          >
            <slot name="content" :item="item" :featured="featured">
              <div
                v-if="featured"
                :style="styles['navigator-grid']"
                class="f-navigator-grid"
              >
                <NavigationMenuLink as-child>
                  <NuxtLink
                    :to="featured.to"
                    :style="styles['navigator-featured']"
                    class="f-navigator-featured"
                  >
                    <slot name="featured" :item="featured">
                      <Icon v-if="featured.icon" :alias="featured.icon" />
                      {{ featured.label }}
                    </slot>
                  </NuxtLink>
                </NavigationMenuLink>
                <NavigationMenuLink
                  v-for="child in item.children"
                  :key="isMenu(child) ? child.value : child.to"
                  as-child
                >
                  <NuxtLink
                    v-if="!isMenu(child)"
                    :to="child.to"
                    :style="styles['navigator-card']"
                    class="f-navigator-card"
                  >
                    <slot name="card" :item="child">
                      <Icon v-if="child.icon" :alias="child.icon" />
                      {{ child.label }}
                    </slot>
                  </NuxtLink>
                </NavigationMenuLink>
              </div>
              <template v-else>
                <NavigationMenuLink
                  v-for="child in item.children"
                  :key="isMenu(child) ? child.value : child.to"
                  as-child
                >
                  <NuxtLink
                    v-if="!isMenu(child)"
                    :to="child.to"
                    :style="styles['navigator-link']"
                    class="f-navigator-link"
                  >
                    <slot name="link" :item="child">
                      <Icon v-if="child.icon" :alias="child.icon" />
                      {{ child.label }}
                    </slot>
                  </NuxtLink>
                </NavigationMenuLink>
              </template>
            </slot>
          </NavigationMenuContent>
        </template>

        <!-- Direct link -->
        <template v-else>
          <NavigationMenuLink as-child>
            <NuxtLink
              :to="item.to"
              :style="styles['navigator-link']"
              class="f-navigator-link"
            >
              <slot name="link" :item="item">
                <Icon v-if="item.icon" :alias="item.icon" />
                {{ item.label }}
              </slot>
            </NuxtLink>
          </NavigationMenuLink>
        </template>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        v-if="indicator"
        :style="styles['navigator-indicator']"
        class="f-navigator-indicator"
      >
        <slot name="indicator" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div
      :style="styles['navigator-viewport-wrapper']"
      class="f-navigator-viewport-wrapper"
    >
      <NavigationMenuViewport
        :style="{
          ...styles['navigator-viewport'],
          width: 'var(--reka-navigation-menu-viewport-width)',
          height: 'var(--reka-navigation-menu-viewport-height)',
          left: 'var(--reka-navigation-menu-viewport-left)',
        }"
        class="f-navigator-viewport"
      />
    </div>
  </NavigationMenuRoot>
</template>

<style>
@import '#build/untheme/navigator-root.css';
@import '#build/untheme/navigator-list.css';
@import '#build/untheme/navigator-item.css';
@import '#build/untheme/navigator-trigger.css';
@import '#build/untheme/navigator-link.css';
@import '#build/untheme/navigator-content.css';
@import '#build/untheme/navigator-viewport.css';
@import '#build/untheme/navigator-viewport-wrapper.css';
@import '#build/untheme/navigator-indicator.css';
@import '#build/untheme/navigator-grid.css';
@import '#build/untheme/navigator-card.css';
@import '#build/untheme/navigator-featured.css';
</style>
