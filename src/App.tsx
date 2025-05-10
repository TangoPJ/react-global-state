import { useHandleComputed, useGlobalStore } from "./hooks/useGlobalStore";

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
  const a = useGlobalStore<number>("a", 0);
  return (
    <button
      className={styles.button}
      onClick={() => {
        state.value++;
        a.value++;
      }}
    >
      +
    </button>
  );
};

const SecondButton = () => {
  const state = useGlobalStore("counter", 0);
  const b = useGlobalStore<number>("b", 0);

  return (
    <button
      className={styles.button}
      onClick={() => {
        state.value--;
        b.value++;
      }}
    >
      -
    </button>
  );
};

const Result = () => {
  const state = useGlobalStore("counter");
  return <p>Result: {state}</p>;
};

const DoubledResult = () => {
  const sum = useHandleComputed(["a", "b"], (a, b) => a.value + b.value);

  const a = useGlobalStore<number>("a");
  const b = useGlobalStore<number>("b");

  const computed = useHandleComputed("counter", (current) => current.value * 2);

  return (
    <>
      <p>Doubled value: {computed}</p>
      <p>Sum: {sum}</p>
      <p>a: {a}</p>
      <p>b: {b}</p>
    </>
  );
};
