import React from "react";
import MyReact from "./lib/MyReact";

function NameField() {
  const [firstname, setFirstname] = MyReact.useState("사용자1");
  const [lastname, setLastname] = MyReact.useState("김");

  const handleChangeFirstname = (e) => setFirstname(e.target.value);
  const handleChangeLastname = (e) => setLastname(e.target.value);

  return (
    <>
      <input value={firstname} onChange={handleChangeFirstname} />
      <input value={lastname} onChange={handleChangeLastname} />
    </>
  );
}

export default () => <NameField />;
