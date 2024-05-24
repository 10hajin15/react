import React from "react";
import createEventEmitter from "./shared/lib/EventEmitter";

const MyReact = (function () {
  function createContext(defaultValue) {
    let emitter;

    function Provider({ value, children }) {
      if (!emitter) {
        emitter = createEventEmitter(value);
      }
      React.useEffect(() => {
        emitter.set(value);
      }, [value]);

      return <>{children}</>;
    }

    function getValue() {
      return emitter ? emitter.get() : defaultValue;
    }

    function on(handler) {
      emitter?.on(handler);
    }

    function off(handler) {
      emitter?.off(handler);
    }

    return {
      Provider,
      getValue,
      on,
      off,
    };
  }

  function useContext(context) {
    const [value, setValue] = React.useState(context.getValue());

    React.useEffect(() => {
      context.on(setValue);
      return () => context.off(setValue);
    }, [context]);

    return value
  }

  return {
    createContext,
    useContext,
  };
})();

export default MyReact;
