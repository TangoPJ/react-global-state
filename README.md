# Lightweight Global Store for Primitives in React with @preact/signals

A simple and efficient way to manage global state for primitive values (strings, numbers, booleans, null, undefined) in React applications using the power of `@preact/signals-react`. This hook provides a lightweight global store and computed values, leveraging signals for reactivity and performance.

## Features
- **Global Store**: Create and access a global store for primitive values with `useGlobalStore`.
- **Computed Values**: Derive computed state from multiple store keys with `useHandleComputed`.
- **Lightweight**: Built on `@preact/signals-react` for minimal overhead and fast updates.
- **Type-Safe**: Fully typed with TypeScript support.

## Installation
```bash
npm install react-global-signals
```

### Using
#### Creating a Global Store
```tsx
import { useGlobalStore } from 'react-global-signals';

function FirstButton() {
  const counter = useGlobalStore<number>('counter', 0); // Type-safe: number
  return (
    <button onClick={() => counter.value++}>
      + (Counter: {counter.value})
    </button>
  );
}
```

#### Computing Values
```tsx
import { useGlobalStore, useHandleComputed } from 'react-global-signals';

function SumDisplay() {
  const a = useGlobalStore<number>('a', 0);
  const b = useGlobalStore<number>('b', 0);
  const sum = useHandleComputed(['a', 'b'], (a, b) => (a || 0) + (b || 0));
  return <p>Sum: {sum?.value}</p>;
}
```

### Notes
- Use unique keys to avoid conflicts in the global store.
- useGlobalStore is type-safe when you provide a typed initial value (e.g., useGlobalStore<number>('key', 0)).
- useHandleComputed requires non-empty keys and existing store values.
