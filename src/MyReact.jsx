const MyReact = (function MyReact() {
  const memorizedStates = [];
  const isInitialized = [];
  let cursor = 0;

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

  return {
    useRef,

    resetCursor,
  };
})();

export default MyReact;
