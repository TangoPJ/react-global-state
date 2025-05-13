import { useComputed, useSignals } from "@preact/signals-react/runtime";
import {
  signal,
  type ReadonlySignal,
  type Signal,
} from "@preact/signals-react";

export type TValue = string | number | boolean | null | undefined;

export { type Signal, signal, useComputed, useSignals };

const STORE: Record<string, Signal<TValue>> = {};

export const useGlobalStore = <T extends TValue>(
  key: string,
  initialValue?: T,
): Signal<T> => {
  useSignals();

  const defaultValue = initialValue === void 0 ? null : initialValue;
  const store = (STORE[key] = STORE[key] ?? signal(defaultValue));
  return store as Signal<T>;
};

export const useHandleComputed = (
  keys: string | string[],
  fn: (...args: Exclude<undefined | null, TValue>[]) => any,
): ReadonlySignal<TValue> | undefined => {
  useSignals();

  if (!keys || !keys.length) {
    console.error("Keys must not be empty string or empty array");
    return;
  }

  const storedValues: Signal<Exclude<undefined | null, TValue>>[] = [];

  if (typeof keys === "string") {
    keys = [keys];
  }

  for (const key of keys) {
    const storedValue = STORE[key];
    if (storedValue !== void 0 && storedValue !== null)
      storedValues.push(storedValue as never);
  }

  if (isEmpty(storedValues)) {
    console.error("Store is empty");
    return;
  }

  return useComputed(() => fn(...storedValues.map((s) => s.value)));
};

const isEmpty = (arr: Signal<TValue>[]) => arr.length === 0;
