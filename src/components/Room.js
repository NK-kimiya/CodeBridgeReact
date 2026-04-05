// Room.js
import React, { useContext, useEffect } from "react";
import { withCookies } from "react-cookie";
import { RoomContext } from "../context/RoomProvider"; // ✅ ProviderからContextをインポート
import { useNavigate } from "react-router-dom"; // ✅ react-router の遷移フック
import Nav from "./Nav";

const Room = (props) => {
  const { state, toggleView, inputChangeLog, entering, roomErrorMessage } =
    useContext(RoomContext);
  //const navigate = useNavigate();  // ✅ ページ遷移用
  const token = props.cookies.get("jwt-token"); // ✅ JWTトークンを取得

  // ✅ フォーム送信処理（navigateで画面遷移）
  const handleSubmit = async (event) => {
    const success = await entering(event, token);
    if (success) {
      //navigate('/app');  // ✅ 成功時にアプリ画面へ遷移
    } else {
      //navigate('/room'); // ✅ 失敗時はルーム画面へ戻す
    }
  };

  return (
    <div className="row g-0">
      <div className="col-xl-2 col-lg-3 col-md-4">
        <Nav />
      </div>

      <div className="col-xl-10 col-lg-9 col-md-8 p-0">
        <div className="d-flex  flex-column justify-content-center align-items-center min-vh-100 ">
          {state.isEnteringView ? (
            <h3>ルームに参加</h3>
          ) : (
            <h3>ルームの新規作成</h3>
          )}
          <form
            id="entering-area-form"
            onSubmit={handleSubmit}
            className="w-75 w-sm-auto"
          >
            <fieldset>
              <label for="disabledTextInput" class="form-label">
                ルーム名
              </label>
              <input
                type="text"
                name="name"
                id="disabledTextInput"
                className="form-control"
                value={state.credentialsLog.name}
                onChange={inputChangeLog}
              />
              <label for="disabledPasswordInput" class="form-label">
                パスワード
              </label>
              <input
                type="password"
                name="password"
                id="disabledPasswordInput"
                className="form-control"
                value={state.credentialsLog.password}
                onChange={inputChangeLog}
              />

              {/* モード切り替えリンク */}
              <a href="#" id="entering-area-form-link" onClick={toggleView}>
                {state.isEnteringView ? "新規作成" : "入室"}
              </a>
              <p>{roomErrorMessage}</p>
              {/* ボタン表示 */}
              {state.isEnteringView ? (
                <div className="">
                  <button className="btn btn-dark w-100" type="submit">
                    参加
                  </button>
                </div>
              ) : (
                <button className="btn btn-dark w-100" type="submit">
                  新規作成
                </button>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withCookies(Room);
