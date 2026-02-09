<script lang="ts">
import type { NavigatorProps } from "../types/navigator";

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
} = defineProps<NavigatorProps>();

const route = useRoute();

const isActive = (item: NavigatorItem): boolean => {
  if (isMenu(item)) {
    return item.children.some((child) => isActive(child));
  }
  return route.path.startsWith(item.to);
};
</script>

<template>
  <NavigationMenuRoot
    :orientation="orientation"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    class="f-navigator-root"
  >
    <NavigationMenuList
      class="f-navigator-list"
    >
      <NavigationMenuItem
        v-for="item in items"
        :key="isMenu(item) ? item.value : item.to"
        :value="isMenu(item) ? item.value : undefined"
        class="f-navigator-item"
      >
        <!-- Menu with children -->
        <template v-if="isMenu(item)">
          <NavigationMenuTrigger
            :data-selected="isActive(item) || undefined"
            class="f-navigator-trigger"
          >
            <slot name="trigger" :item="item">
              <Icon v-if="item.icon" :alias="item.icon" />
              {{ item.label }}
            </slot>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            class="f-navigator-content"
          >
            <slot name="content" :item="item" :featured="featured">
              <div
                v-if="featured"
                class="f-navigator-grid"
              >
                <NavigationMenuLink as-child>
                  <NuxtLink
                    :to="featured.to"
                    class="f-navigator-featured"
                  >
                    <slot name="featured" :item="featured">
                      <Icon v-if="featured.icon" :alias="featured.icon" />
                      <span
                        class="f-navigator-featured-title"
                      >
                        {{ featured.label }}
                      </span>
                      <span
                        v-if="featured.description"
                        class="f-navigator-featured-description"
                      >
                        {{ featured.description }}
                      </span>
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
                    class="f-navigator-card"
                  >
                    <slot name="card" :item="child">
                      <Icon v-if="child.icon" :alias="child.icon" />
                      <span
                        class="f-navigator-card-title"
                      >
                        {{ child.label }}
                      </span>
                      <span
                        v-if="child.description"
                        class="f-navigator-card-description"
                      >
                        {{ child.description }}
                      </span>
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
              :data-selected="isActive(item) || undefined"
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
        class="f-navigator-indicator"
      >
        <slot name="indicator" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div
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

