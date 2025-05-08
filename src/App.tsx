import {
  useHandleComputed,
  useStore,
  type Signal,
  type TValue,
} from "./hooks/useStore";

export const App = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <FirstButton />
        <SecondButton />
      </div>
      <div
        style={{
          display: "inline-flex",
          width: "auto",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Result />
        <DoubledResult />
      </div>
    </div>
  );
};

const FirstButton = () => {
  const state = useStore("counter", 0);
  return (
    <button
      style={{ width: "24px", height: "24px" }}
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
  const state = useStore("counter", 0);

  return (
    <button
      style={{ width: "24px", height: "24px" }}
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

const Result = () => {
  const state = useStore("counter");
  return <p>Result: {state}</p>;
};

const DoubledResult = () => {
  const computed = useHandleComputed("counter");

  const result = computed((current: Signal<TValue>) => {
    if (typeof current.value === "number") return current.value * 2;
  });

  return <p>Doubled value: {result ?? null}</p>;
};
