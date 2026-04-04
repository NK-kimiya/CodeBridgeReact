import React, { useReducer, useState } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import apiClient from "../apiClient";
import { TOGGLE_MODE, INPUT_EDIT } from "./actionType";

const initialState = {
  isLoginView: false,
  credentialsLog: {
    email: "",
    password: "",
    username: "",
  },
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    case INPUT_EDIT: {
      return {
        ...state,
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
const Login = (props) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [loginDisplay, setLoginDisplay] = useState(false);

  const loginDisplayHandle = () => {
    setLoginDisplay((prev) => !prev);
    if (state.isLoginView == false) {
      toggleView();
    }
  };

  const signUpDisplayHandle = () => {
    setLoginDisplay((prev) => !prev);
    if (state.isLoginView == true) {
      toggleView();
    }
  };

  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
    setLoginErrorMessage(null);
  };

  const inputChangeLog = (event) => {
    dispatch({
      type: INPUT_EDIT,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();
    if (state.isLoginView) {
      try {
        const res = await apiClient.post(
          "/authen/jwt/create/",
          state.credentialsLog,
        );
        props.cookies.set("jwt-token", res.data.access);
        res.data.access
          ? (window.location.href = "/room")
          : (window.location.href = "/");
      } catch (err) {
        setLoginErrorMessage(
          "ログイン失敗、ユーザー名かパスワードが正しくありません。",
        );
      }
    } else {
      try {
        await apiClient.post("/api/create/", state.credentialsLog);

        const res = await apiClient.post(
          "/authen/jwt/create/",
          state.credentialsLog,
        );
        props.cookies.set("jwt-token", res.data.access);
        res.data.access
          ? (window.location.href = "/room")
          : (window.location.href = "/");
      } catch (err) {
        setLoginErrorMessage(
          "ユーザー登録に失敗しました。入力内容で空欄があるかユーザー名かメールアドレスが既に存在しています。",
        );
      }
    }
  };
  return (
    <div>
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center bg-dark min-vh-100">
        <div className="col-lg-6 p-0 p-md-5 ">
          <h2 className="text-center text-lg-end p-0 text-white">
            CODE BRIDGE
          </h2>
        </div>
        <div className="col-12 col-lg-6 p-0 px-5 d-flex justify-content-center justify-content-lg-start">
          <div className="w-lg-75">
            <form onSubmit={login} className="">
              <label
                for="exampleFormControlInput1"
                className="form-label text-white"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                value={state.credentialsLog.email}
                onChange={inputChangeLog}
              />
              {!state.isLoginView && (
                <div>
                  <label
                    for="exampleInputUsername"
                    className="form-label text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="exampleInputUsername"
                    value={state.credentialsLog.username}
                    onChange={inputChangeLog}
                  ></input>
                </div>
              )}
              <label
                for="exampleInputPassword1"
                className="form-label text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                value={state.credentialsLog.password}
                onChange={inputChangeLog}
              ></input>
              <p className="pt-3">
                <a href="#" className="text-white" onClick={() => toggleView()}>
                  {state.isLoginView ? "新規作成はこちら" : "ログインはこちら"}
                </a>
              </p>
              <p className="error_message text-danger">{loginErrorMessage}</p>
              {state.isLoginView ? (
                <button className="btn btn-warning text-white" type="submit">
                  Login
                </button>
              ) : (
                <button className="btn btn-warning text-white" type="submit">
                  Sign up
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withCookies(Login);
