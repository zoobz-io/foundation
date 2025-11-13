<script setup lang="ts">
const navigationSections = [
  {
    label: "Dashboard",
    value: "dashboard",
    // icon: "home" as IconAlias,
    items: [
      { value: "overview", label: "Overview" },
      { value: "analytics", label: "Analytics" },
      { value: "reports", label: "Reports" },
    ],
  },
  {
    label: "Projects",
    value: "projects",
    // icon: "folder" as IconAlias,
    items: [
      { value: "all-projects", label: "All Projects" },
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
    ],
  },
  {
    label: "Settings",
    value: "settings",
    // icon: "settings" as IconAlias,
    items: [
      { value: "general", label: "General" },
      { value: "account", label: "Account" },
      { value: "security", label: "Security" },
      { value: "notifications", label: "Notifications" },
    ],
  },
];

const contentTabs = [
  { value: "overview", label: "Overview" },
  { value: "details", label: "Details" },
  { value: "activity", label: "Activity" },
  { value: "syntax", label: "Syntax" },
];

const activeTab = ref("syntax");

const { data: syntaxContent } = await useAsyncData("test-content", () =>
  queryCollection("example").path("/test").first(),
);
</script>

<template>
  <Aside>
    <Accordion :items="navigationSections" type="multiple">
      <template #content="{ item }">
        <Listbox :items="item.items" />
      </template>
    </Accordion>
  </Aside>
  <Tabs :tabs="contentTabs" v-model="activeTab">
    <template #overview>
      <Article>
        <H1>Typography System</H1>
        <P>
          Welcome to the <Strong>Foundation</Strong> theming system. This page
          demonstrates heading components, <Em>inline formatting</Em>, and
          article prose styling.
        </P>
        <H2>Text Formatting</H2>
        <P>
          You can use <Strong>bold text</Strong> for emphasis and
          <Em>italic text</Em> for subtle emphasis. Inline code looks like
          <Code>const x = 42</Code> and stands out from regular text.
        </P>
        <H3>Code Blocks</H3>
        <P>For longer code samples, use pre-formatted blocks:</P>
        <Pre>function greet(name: string) { return `Hello, ${name}!`; }</Pre>
        <H3>Lists</H3>
        <P>Unordered lists work great for related items:</P>
        <Ul>
          <Li>First item in the list</Li>
          <Li>Second item with more details</Li>
          <Li>Third and final item</Li>
        </Ul>
        <P>Ordered lists are perfect for sequential steps:</P>
        <Ol>
          <Li>Install dependencies</Li>
          <Li>Configure your environment</Li>
          <Li>Run the development server</Li>
        </Ol>
      </Article>
    </template>
    <template #details>
      <Article>
        <H1>Component Details</H1>
        <P>
          Each heading component (H1-H6) is independently themeable through the
          untheme system. The Article component provides optimal reading width
          at 65 characters and relaxed line height.
        </P>
        <H2>Design Principles</H2>
        <Blockquote>
          Good design is as little design as possible. Less, but better –
          because it concentrates on the essential aspects.
        </Blockquote>
        <P>
          This system follows key principles of semantic markup and progressive
          enhancement.
        </P>
        <H2>Token Configuration</H2>
        <P>
          All typography tokens reference the system design tokens defined in
          <Code>nuxt.config.ts</Code>, allowing for consistent theming across
          light and dark modes.
        </P>
        <P>Key features include:</P>
        <Ul>
          <Li
            ><Strong>Semantic components</Strong> for all markdown elements</Li
          >
          <Li><Em>Flexible theming</Em> through token system</Li>
          <Li>Responsive typography with proper spacing</Li>
        </Ul>
      </Article>
    </template>
    <template #activity>
      <Article>
        <H1>Recent Activity</H1>
        <P
          >Activity feed would appear here with chronological updates and
          events.</P
        >
        <H2>Today</H2>
        <Ol>
          <Li
            >Added <Strong>markdown components</Strong> (Code, Pre, Strong, Em,
            etc.)</Li
          >
          <Li>Configured prose styling for Article component</Li>
          <Li>Updated typography scale with proper line heights</Li>
        </Ol>
        <H2>Earlier</H2>
        <Ul>
          <Li>System configuration updated with new heading components</Li>
          <Li>Theme system initialized with reference tokens</Li>
          <Li>Role configurations set up in <Code>nuxt.config.ts</Code></Li>
        </Ul>
        <Blockquote>
          The system is now ready for markdown content rendering with full
          semantic support.
        </Blockquote>
      </Article>
    </template>
    <template #syntax>
      <Article>
        <ContentRenderer v-if="syntaxContent" :value="syntaxContent" />
      </Article>
    </template>
  </Tabs>
</template>
