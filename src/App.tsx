import {
  useHandleComputed,
  useGlobalStore,
  type Signal,
  type TValue,
} from "./hooks/useGlobalStore";

import styles from "./App.module.css";

export const App = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <h2>Signals:</h2>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <FirstButton />
        <SecondButton />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <h3>First component:</h3>
        <Result />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <h3>Second component:</h3>
        <DoubledResult />
      </div>
    </div>
  );
};

const FirstButton = () => {
  const state = useGlobalStore("counter", 0);
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (typeof state.value === "number") {
          state.value++;
        }
      }}
    >
      +
    </button>
  );
};

const SecondButton = () => {
  const state = useGlobalStore("counter", 0);

  return (
    <button
      className={styles.button}
      onClick={() => {
        if (typeof state.value === "number") {
          state.value--;
        }
      }}
    >
      -
    </button>
  );
};

let rerender = 0;
const Result = () => {
  console.log("Renders: " + ++rerender);
  const state = useGlobalStore("counter");
  return <p>Result: {state}</p>;
};

const DoubledResult = () => {
  const computed = useHandleComputed(
    "counter",
    (current: Signal<TValue>) =>
      typeof current.value === "number" && current.value * 2,
  );

  return <p>Doubled value: {computed}</p>;
};
