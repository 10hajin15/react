import React from "react";
import MyReact from "./MyReact";
import * as MyForm_reducer from "./MyForm_reducer";

const App = () => {
  return <LoginForm />;
};

export default App;

function RegisterForm() {
  const [state, dispatch] = MyReact.useReducer(reducer, initialValue);

  const handleChange = (e) =>
    dispatch({ type: "SET_FIELD", name: e.target.name, value: e.target.value });
  const handleReset = (e) => dispatch({ type: "RESET" });
  const handleSubmit = (e) => dispatch({ type: "VALIDATE" });

  return (
    <>
      <div>
        <label>닉네임:</label>
        <input
          type="text"
          name="nickname"
          value={state.value.nickname}
          onChange={handleChange}
        />
        <span>{state.error.nickname}</span>
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          name="password"
          value={state.value.password}
          onChange={handleChange}
        />
        <span>{state.error.password}</span>
      </div>
      <button onClick={handleReset}>초기화</button>
      <button onClick={handleSubmit}>회원가입</button>
    </>
  );
}

// ############ createStore 사용 ############
// function reducer(state, action) {
//   if (action.type === 'count') {
//     return {...state, value: state.value + 1}
//   }
//   throw "알 수 없는 액션"
// }

// const initialValue = {value:0}
// const store = MyReact.createStore(reducer, initialValue)

// console.log("after createStore:", store.getState()) // {value: 0}

// store.subscribe(() => console.log("subscribe:", store.getState()))
// store.dispatch({type: "count"})   // {value: 1}

const initialValue = {
  value: {
    nickname: "",
    password: "",
  },
  error: {
    nickname: "",
    password: "",
  },
};

const reducer = (state, action) => {
  if (action.type === "SET_FIELD") {
    return {
      ...state,
      value: {
        ...state.value,
        [action.name]: action.value,
      },
    };
  }
  if (action.type === "RESET") {
    return {
      value: {
        nickname: "",
        password: "",
      },
      error: {
        nickname: "",
        password: "",
      },
    };
  }
  if (action.type === "VALIDATE") {
    return {
      ...state,
      error: {
        nickname: /^\w+$/.test(state.value.nickname)
          ? ""
          : "영문, 숫자만 입력하세요",
        password: /^.{3,6}$/.test(state.value.password)
          ? ""
          : "3자이상 6자이하로 입력하세요",
      },
    };
  }
  throw Error("알 수 없는 액션");
};

// ############ LoginForm에 reducer 적용 ############
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
    <MyForm_reducer.Form
      initialValue={{
        email: "",
        password: "",
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      <MyForm_reducer.Field type="text" name="email" />
      <MyForm_reducer.ErrorMessage name="email" />
      <MyForm_reducer.Field type="password" name="password" />
      <MyForm_reducer.ErrorMessage name="password" />
      <button type="submit">로그인</button>
    </MyForm_reducer.Form>
  );
};
