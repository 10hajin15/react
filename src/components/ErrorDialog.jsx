import Dialog from "./Dialog";
import * as MyLayout from "../MyLayout";

const ErrorDialog = ({ closeDialog }) => (
  <Dialog
    header={<>오류</>}
    footer={<button onClick={closeDialog}>네, 알겠습니다</button>}
  >
    잠시 후 다시 시도해 주세요.
  </Dialog>
);

export default MyLayout.withLayout(ErrorDialog);
