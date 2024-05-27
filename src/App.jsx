import React from "react";
import MyReact from "./MyReact";

const App = () => {
  return <UseRefTest />;
};

export default App;

const UseRefTest = () => {
  MyReact.resetCursor();

  const [state1, setState1] = React.useState(0);
  const ref1 = MyReact.useRef(1);
  const ref2 = MyReact.useRef("a");

  if (state1 > 2) ref1.current = ref1.current + 1;

  const handleCount = () => setState1(state1 + 1);
  const handleSubmit = () => console.log("input 값:", ref2.current.value);

  return (
    <div>
      <button onClick={handleCount}>state1 증가 (state1: {state1})</button>
      <div>ref1(state1이 2보다 크면 증가): {ref1.current}</div>
      <input ref={ref2} />
      <button onClick={handleSubmit}>ref2로 인풋 값 조회</button>
    </div>
  );
};
