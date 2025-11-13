<script setup lang="ts">
const { mode } = useUntheme();

const button = defineButton(
  {},
  {
    click: () => {
      mode.value = mode.value === "dark" ? "light" : "dark";
    },
  },
);
</script>

<template>
  <Main>
    <Header>
      <section>
        <Icon alias="home" />
      </section>
      <section>APPLES</section>
      <section>
        <Button>
          <Icon alias="theme" />
        </Button>
        <Button v-bind="button.props" v-on="button.handlers">
          <Icon alias="dark" />
        </Button>
      </section>
    </Header>
    <slot />
  </Main>
</template>
