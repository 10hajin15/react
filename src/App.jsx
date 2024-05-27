import React from "react";
import * as MyForm from "./MyForm";

const App = () => {
  return <LoginForm />;
};

export default App;

const LoginForm = () => {
  const validate = (values) => {
    const errors = {
      email: "",
      password: "",
    };

    if (!values.email) {
      errors.email = "이메일을 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }

    return errors;
  };

  const handleSubmit = (values) => {
    console.log("Submitted", values);
  };

  return (
    <MyForm.Form
      initialValue={{ email: "", password: "" }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      <div>
        <MyForm.Field type="text" name="email" />
        <MyForm.ErrorMessage name="email" />
      </div>
      <div>
        <MyForm.Field type="password" name="password" />
        <MyForm.ErrorMessage name="password" />
      </div>
      <button type="submit">로그인</button>
    </MyForm.Form>
  );
};
