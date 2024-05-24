import Dialog from "./Dialog";
import * as MyLayout from "../MyLayout";

const PaymentSuccessDialog = () => {
  const { closeDialog } = MyLayout.useDialog();

  const handleClick = () => {
    closeDialog();
  };

  return (
    <Dialog
      header={<>결제 완료</>}
      footer={
        <>
          <button onClick={handleClick}>아니오</button>
          <button onClick={handleClick}>네</button>
        </>
      }
    >
      결제가 완료되었습니다.
    </Dialog>
  );
};

export default PaymentSuccessDialog;
