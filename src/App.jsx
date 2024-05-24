import React from "react";
import MyReact from "./MyReact";

const App = () => {
  return (
    <CountProvider>
      <Count />
      <PlusButton />
    </CountProvider>
  );
};

export default App;

const countContext = MyReact.createContext({});

const CountProvider = ({children}) => {
  const [count, setCount] = React.useState(0);
  const value = { count, setCount };
  return (
    <countContext.Provider value={value}>{children}</countContext.Provider>
  );
};

const Count = () => {
  const { count } = MyReact.useContext(countContext);
  return <div>{count}</div>;
};

const PlusButton = () => {
  const { count, setCount } = MyReact.useContext(countContext);
  const handleClick = () => setCount(count + 1);
  return <button onClick={handleClick}>카운트 올리기</button>;
};
