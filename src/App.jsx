import React from "react";
import MyReact from "./lib/MyReact";

const Counter = () => {
  MyReact.resetCursor();
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  const handleClick = () => setCount(count + 1);
  const handleChangeName = (e) => setName(e.target.value);

  MyReact.useEffect(() => {
    setName(localStorage.getItem("name") || "");
    console.log("effect3");
  }, []);

  MyReact.useEffect(() => {
    document.title = `count: ${count} | name: ${name}`;
    console.log("effect1");

    return function cleanup() {
      document.title = "";
      console.log("effect1 cleanup");
    };
  }, [count, name]);

  MyReact.useEffect(() => {
    localStorage.setItem("name", name);
    console.log("effect2");
  }, [name]);

  console.log("Counter rendered");
  return (
    <>
      <button onClick={handleClick}>더하기</button>
      <input value={name} onChange={handleChangeName} />
    </>
  );
};

// export default () => <Counter />;

const Wrapper = () => {
  const [mounted, setMounted] = React.useState(false);
  const handleToggle = () => {
    const nextMounted = !mounted;
    if (!nextMounted) MyReact.cleanupEffects();
    setMounted(nextMounted);
  };

  return (
    <>
      <button onClick={handleToggle}>컴포넌트 토글</button>
      {mounted && <Counter />}
    </>
  );
};

export default () => <Wrapper />;
