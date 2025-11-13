# Syntax Highlighting Test

Welcome to the **Foundation** theming system with _Shiki syntax highlighting_.

## Code Examples

Inline code like `const x = 42` should be styled but not highlighted.

### TypeScript Example

```ts
interface User {
  name: string;
  age: number;
  isActive: boolean;
}

function greet(user: User): string {
  return `Hello, ${user.name}! You are ${user.age} years old.`;
}

const user: User = {
  name: "Alice",
  age: 30,
  isActive: true,
};

console.log(greet(user));
```

### Vue Example

```vue
<script setup lang="ts">
const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
div {
  padding: 1rem;
  background: var(--color-surface);
}
</style>
```

### JavaScript Example

```javascript
// This is a comment
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log({ doubled, sum });
```

### Bash Example

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Text Formatting

You can use **bold text** for emphasis and _italic text_ for subtle emphasis.

> This is a blockquote with some **bold** and _italic_ text inside it.
> It can span multiple lines.

---

## Lists

### Unordered List

- First item
- Second item with **bold**
- Third item with _italic_
  - Nested item 1
  - Nested item 2

### Ordered List

1. Install dependencies
2. Configure environment
3. Run the server
   1. Development mode
   2. Production mode

## More Headings

### H3 Heading

Some content under H3.

#### H4 Heading

Some content under H4.

##### H5 Heading

Some content under H5.

###### H6 Heading

Some content under H6.

## Links

Check out the [Foundation documentation](https://github.com) for more information.
