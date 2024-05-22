import React from "react";
import Page from "../../components/Page";
import * as MyLayout from "../../MyLayout";
import Dialog from "../../components/Dialog";
import ErrorDialog from "../../components/ErrorDialog";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.clickedError = this.clickedError.bind(this)
    this.clickedSuccess = this.clickedSuccess.bind(this)
  }

  clickedError() {
    const { openDialog } = this.props;
    openDialog(<ErrorDialog />)
  }

  clickedSuccess() {
    const {openDialog} = this.props;
    openDialog(<PaymentSuccessDialog />)
  }

  render() {
    return (
      <div className="MainPage">
        <Page header={<h1>Shopping List for {this.props.name}</h1>}>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
          <button onClick={this.clickedError}>
            오류발생
          </button>
          <button onClick={this.clickedSuccess}>
            주문성공
          </button>
        </Page>
      </div>
    );
  }
}

export default MyLayout.withLayout(MainPage);
