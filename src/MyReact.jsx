import React from "react";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const isInitialized = [];
  let cursor = 0;

  // 구현을 위해 이곳만 리액트 훅을 사용한다.
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

  function resetCursor() {
    cursor = 0;
  }

  function useRef(initialValue) {
    if (!isInitialized[cursor]) {
      memorizedStates[cursor] = { current: initialValue };
      isInitialized[cursor] = true;
    }
    const memorizedState = memorizedStates[cursor];
    cursor = cursor + 1;
    return memorizedState;
  }

  function createStore(reducer, initialValue) {
    let currentState = initialValue;
    const listeners = [];

    const getState = () => currentState;
    const subscribe = (callback) => listeners.push(callback);

    const dispatch = (action) => {
      const nextState = reducer(currentState, action);
      if (nextState !== currentState) {
        currentState = nextState;
        listeners.forEach((listener) => listener());
      }
    };

    return { getState, subscribe, dispatch };
  }

  function useReducer(reducer, initialValue) {
    const { forceUpdate } = useForceUpdate();
    if (!isInitialized[cursor]) {
      memorizedStates[cursor] = createStore(reducer, initialValue);
      isInitialized[cursor] = true;
    }
    const store = memorizedStates[cursor];
    store.subscribe(forceUpdate);
    cursor = cursor + 1;
    return [store.getState(), store.dispatch];
  }

  function useMemo(nextCreate, deps) {
    if (!memorizedStates[cursor]) {
      const nextValue = nextCreate();
      memorizedStates[cursor] = [nextValue, deps];
      cursor = cursor + 1;
      return nextValue;
    }
    const nextDeps = deps;
    const [prevValue, prevDeps] = memorizedStates[cursor];
    if (prevDeps.every((prev, idx) => prev === nextDeps[idx])) {
      cursor = cursor + 1;
      return prevValue;
    }
    const nextValue = nextCreate();
    memorizedStates[cursor] = [nextValue, nextDeps];
    cursor = cursor + 1;
    return nextValue;
  }

  function memo(TargetComponent) {
    return (nextProps) => {
      if (!TargetComponent.memorizedState) {
        const nextValue = React.createElement(TargetComponent, nextProps);
        TargetComponent.memorizedState = [nextValue, nextProps];
        return nextValue;
      }
      const [prevValue, prevProps] = TargetComponent.memorizedState;
      const sameProps = Object.keys(nextProps).every((key) => {
        return nextProps[key] === prevProps[key];
      });
      if (sameProps) return prevValue;
      const nextValue = React.createElement(TargetComponent, nextProps);
      TargetComponent.memorizedState = [nextValue, nextProps];
      return nextValue;
    };
  }

  function useCallback(callback, deps) {
    return useMemo(() => callback, deps);
  }

  return {
    useRef,
    createStore,
    useReducer,
    useMemo,
    memo,
    useCallback,

    resetCursor,
  };
})();

export default MyReact;
