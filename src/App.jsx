import React from "react";
import MainPage from "./pages/MainPage";
import * as MyLayout from "./MyLayout"

const App = () => {
  return (
    <MyLayout.Layout>
      <MainPage />
    </MyLayout.Layout>
  );
};

export default App;
