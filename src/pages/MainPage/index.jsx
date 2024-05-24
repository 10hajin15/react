import React from "react";
import Page from "../../components/Page";
import ErrorDialog from "../../components/ErrorDialog";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";
import * as MyLayout from "../../MyLayout";

const MainPage = () => {
  const { openDialog } = MyLayout.useDialog();

  const clickedError = () => {
    openDialog(<ErrorDialog />);
  };

  const clickedSuccess = () => {
    openDialog(<PaymentSuccessDialog />);
  };

  return (
    <div className="MainPage">
      <Page header={<h1>Shopping List for </h1>}>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
        <button onClick={clickedError}>오류발생</button>
        <button onClick={clickedSuccess}>주문성공</button>
      </Page>
    </div>
  );
};

export default MainPage;
