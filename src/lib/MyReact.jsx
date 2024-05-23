import React from "react";

const MyReact = (function MyReact() {
  const memorizedState = []
  const isInitialized = [];
  let cursor = 0;

  function useState(initialValue = "") {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cursor]) {
      memorizedState[cursor] = initialValue;
      isInitialized[cursor] = true;
    }

    const state = memorizedState[cursor]

    const setStateAt = _cursor => nextState => {
      if (state === nextState) return;
      memorizedState[_cursor] = nextState;
      forceUpdate();
    };
    const setState = setStateAt(cursor)
    cursor += 1

    return [state, setState];
  }

  // ForceUpdate 구현을 위해 리액트 훅 사용
  function useForceUpdate() {
    const [value, setValue] = React.useState(1);
    const forceUpdate = () => {
      setValue(value + 1)
      cursor = 0
    };
    return {
      forceUpdate,
    };
  }

  return { useState };
})();

export default MyReact;
