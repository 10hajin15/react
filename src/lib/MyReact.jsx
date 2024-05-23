import React from "react";

const MyReact = (function MyReact() {
  const memorizedState = [];
  const deps = [];
  const isInitialized = [];
  const cleanups = [];
  let cursor = 0;

  function useState(initialValue = "") {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cursor]) {
      memorizedState[cursor] = initialValue;
      isInitialized[cursor] = true;
    }

    const state = memorizedState[cursor];

    const setStateAt = (_cursor) => (nextState) => {
      if (state === nextState) return;
      memorizedState[_cursor] = nextState;
      forceUpdate();
    };
    const setState = setStateAt(cursor);
    cursor += 1;

    return [state, setState];
  }

  // ForceUpdate 구현을 위해 리액트 훅 사용
  function useForceUpdate() {
    const [value, setValue] = React.useState(1);
    const forceUpdate = () => {
      setValue(value + 1);
      cursor = 0;
    };
    return {
      forceUpdate,
    };
  }

  function useEffect(effect, nextDeps) {
    function runDeferredEffect() {
      function runEffect() {
        const cleanup = effect();
        if (cleanup) cleanups[cursor] = cleanup;
      }
      const ENOUGH_TIME_TO_RENDER = 1;
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER);
    }

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor = cursor + 1;
      runDeferredEffect();
      return;
    }

    const prevDeps = deps[cursor];
    const depsSame = prevDeps.every(
      (prevDep, index) => prevDep === nextDeps[index]
    );
    if (depsSame) {
      cursor = cursor + 1;
      return;
    }
    deps[cursor] = nextDeps;
    cursor = cursor + 1;
    runDeferredEffect();
  }

  function resetCursor() {
    cursor = 0;
  }

  function cleanupEffects() {
    cleanups.forEach((cleanup) => typeof cleanup === "function" && cleanup());
  }

  return { useState, useEffect, resetCursor, cleanupEffects };
})();

export default MyReact;
