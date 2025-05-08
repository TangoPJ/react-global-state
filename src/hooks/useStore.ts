import { useComputed, useSignals } from "@preact/signals-react/runtime";
import { signal, type Signal } from "@preact/signals-react";

export type TValue = string | number | boolean | null | undefined;

export { type Signal };

const STORE: Record<string, Signal<TValue>> = {};

export const useStore = (
  key: string,
  initialValue: TValue = null,
): Signal<TValue> => {
  useSignals();
  return (STORE[key] = STORE[key] ?? signal(initialValue));
};

export const useHandleComputed = (keys: string | string[]) => {
  if (!keys || !keys.length) {
    console.error("Keys must not be empty string or array");
    return () => {};
  }

  useSignals();

  const storedValues: Signal<TValue>[] = [];

  if (typeof keys === "string") {
    keys = [keys];
  }

  for (const key of keys) {
    storedValues.push(STORE[key]);
  }

  if (isEmpty(storedValues)) {
    console.error("Store is empty");
  }

  return (fn: Function) => useComputed(() => fn.apply(null, storedValues));
};

const isEmpty = (arr: Signal<TValue>[]) => arr.length === 0;
