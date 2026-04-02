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
      <header className="login-header">
        <h1>Code Bridge</h1>
        <button onClick={loginDisplayHandle}>ログイン</button>
      </header>
      <div className="main-visula">
        <img src="image-main.png"></img>
        <div className="slogan-area">
          <h2>
            Connecting <small>People</small>
            <br></br>
            Through<br></br>
            <small>Code.</small>
          </h2>
          <div className="sign-up-btn-area">
            <button onClick={signUpDisplayHandle}>会員登録</button>
          </div>
        </div>
      </div>
      <div
        className={loginDisplay ? "login-area-wrap" : "login-area-wrap-none"}
      >
        <div className="login-area">
          <button onClick={loginDisplayHandle} className="login-close-btn">
            ×
          </button>
          {!state.isLoginView ? <h3>会員登録</h3> : <h3>ログイン</h3>}
          <form id="login-area-form" onSubmit={login}>
            <small>メールアドレス</small>
            <input
              type="email"
              name="email"
              className="login-area-form-input"
              value={state.credentialsLog.email}
              onChange={inputChangeLog}
            ></input>
            {!state.isLoginView && <small>ユーザー名</small>}
            {!state.isLoginView && (
              <input
                type="text"
                name="username"
                className="login-area-form-input"
                value={state.credentialsLog.username}
                onChange={inputChangeLog}
              />
            )}
            <small>パスワード</small>
            <input
              type="password"
              name="password"
              className="login-area-form-input"
              value={state.credentialsLog.password}
              onChange={inputChangeLog}
            ></input>
            <a href="#" id="login-area-form-link" onClick={() => toggleView()}>
              {state.isLoginView ? "新規作成" : "ログイン"}
            </a>
            <p className="error_message">{loginErrorMessage}</p>
            {state.isLoginView ? (
              <button className="login-area-form-button" type="submit">
                ログイン
              </button>
            ) : (
              <button className="login-area-form-button" type="submit">
                新規作成
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="summary-area">
        <h2>目的・背景</h2>
        <p>
          私はハッカソンなどのチーム開発で、「チームメンバーのスキルを把握するまでに時間がかかる」という課題を感じました。
          また、ChatGPTなどの生成AIの進化により、GitHubのリポジトリを読み解きながら学習するスタイルが増えていると感じています。そこで、私は「リポジトリを共有し、質問や議論ができるWebアプリ」を作成しました。
          チーム開発におけるスキル共有の円滑化と、学習者どうしが技術知識を提供し合える環境を目指しています。
        </p>

        <h3>使用した技術</h3>
        <ul>
          <li>フロントエンド：React</li>
          <li>REST Framework、Express.js</li>
          <li>データベース：SQLite（Django側）、MongoDB（Express/Socket側）</li>
          <li>リアルタイム通信：Socket.io（Express）</li>
          <li>認証：JWT（JSON Web Token）</li>
          <li>AIモデル：PyTorch（BERTによる文章分類）</li>
        </ul>
      </div>
      <div className="function-summary-wrap">
        <h2>具体的な機能</h2>
        <div className="function-summary-area">
          <div className="function-summary-item">
            <h3>ユーザー認証（JWT）</h3>
            <p>アカウント作成・ログインをトークンベースで実装</p>
          </div>
          <div className="function-summary-item">
            <h3>ルーム機能</h3>
            <p>ルーム名とパスワードでルームを作成・参加できる</p>
          </div>
          <div className="function-summary-item">
            <h3>リポジトリ登録・カテゴリ分け</h3>
            <p>
              {" "}
              GitHubのURL・タイトル・概要・デモ動画を投稿可能
              カテゴリを設定して絞り込みもできる
            </p>
          </div>
          <div className="function-summary-item">
            <h3>リアルタイムメッセージ投稿（Socket通信）</h3>
            <p>
              {" "}
              リポジトリごとにチャット形式で質問・議論ができ、
              既読状況をMongoDB＋Socketで管理・表示
            </p>
          </div>
          <div className="function-summary-item">
            <h3>BETA版：AI検索機能（BERT）</h3>
            <p>
              「作りたいアプリの概要文」を入力すると、登録済みのリポジトリの中から類似プロジェクトを提案{" "}
            </p>
            <p>
              今後の展望は、現在の学習データではデータ量が少なく、クラスごとに語尾が敬語やため口が多いといった偏りがあるので、語尾の偏りをなくして、データ量を増やしたデータセットで学習し精度を上げ、一定の精度を保てたらクラスをどんどん増やしていきたいと考えています。さらに、現在強化学習を学んでおり、深層強化学習による精度向上も考えています。
            </p>
          </div>
        </div>
      </div>
      <footer>
        <small>©2025 Code Bridge</small>
      </footer>
    </div>
  );
};

export default withCookies(Login);
