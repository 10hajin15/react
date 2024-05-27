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
      memorizedStates[cursor] = createStore(reducer, initialValue)
      isInitialized[cursor] = true
    }
    const store = memorizedStates[cursor]
    store.subscribe(forceUpdate)
    cursor = cursor+1
    return [store.getState(), store.dispatch]
  }

  return {
    useRef,
    createStore,
    useReducer,

    resetCursor,
  };
})();

export default MyReact;
