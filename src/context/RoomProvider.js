// RoomProvider.js
import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
  useCookies,
} from "react";
import axios from "axios";
import { TOGGLE_MODE, INPUT_EDIT } from "../components/actionType";
import { withCookies } from "react-cookie";
import apiClient from "../apiClient";
// ✅ Context を作成
let isLoggingOut = false;
export const RoomContext = createContext();

// ✅ 初期状態
const initialState = {
  isEnteringView: true,
  credentialsLog: {
    name: "",
    password: "",
  },
};

// ✅ reducer関数（モード切替・入力フィールド編集）
const roomReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        isEnteringView: !state.isEnteringView,
      };
    case INPUT_EDIT:
      return {
        ...state,
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
      };
    default:
      return state;
  }
};

// ✅ RoomProviderコンポーネント
const RoomProvider = (props) => {
  const { children } = props;
  const [roomErrorMessage, setRoomErrorMessage] = useState();
  const [state, dispatch] = useReducer(roomReducer, initialState);
  const [roomData, setRoomData] = useState(null);

  // ✅ モード切り替え関数
  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
    setRoomErrorMessage(null);
  };

  // ✅ 入力フィールド編集関数
  const inputChangeLog = (event) => {
    dispatch({
      type: INPUT_EDIT,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };

  // ✅ 入室・新規作成API処理
  const entering = async (event, token) => {
    console.log("送信するname:", state.credentialsLog.name);
    console.log("送信するpassword:", state.credentialsLog.password);
    event.preventDefault();
    localStorage.removeItem("roomData");

    try {
      let res;

      if (state.isEnteringView) {
        // ✅ 入室処理（ルーム取得）
        res = await apiClient.post(
          "/api/rooms/filter/",
          {
            name: state.credentialsLog.name,
            password: state.credentialsLog.password,
          },
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        );
      } else {
        // ✅ 新規作成処理
        await apiClient.post("/api/rooms/", state.credentialsLog, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        // ✅ 作成後、再度フィルターで取得
        res = await apiClient.post("/api/rooms/filter/", state.credentialsLog, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
      }

      // ✅ データが取得できた場合
      if (res.data?.id) {
        const roomData = { id: res.data.id, name: res.data.name };
        console.log("ログインしたルームは：", res.data.name);
        console.log("ログインしたルームIDは：", res.data.id);
        localStorage.setItem("roomData", JSON.stringify(roomData));
        setRoomData(res.data); // ✅ 正常にセット
        window.location.href = "/app";
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (state.isEnteringView) {
        setRoomErrorMessage(
          "ルームの認証に失敗しました。ユーザー名かパスワードが正しいか確認して下さい。",
        );
      } else {
        setRoomErrorMessage(
          "ルームの作成に失敗しました。入力に空欄があるかルーム名が既に存在しています。",
        );
      }
      if (error.response) {
        if (error.response.status === 401) {
          console.warn("⚠️ トークンが無効、または期限切れです");
          Logout();
        } else {
          console.error("リクエストエラー:", error.response.data);
        }
      } else {
        console.error("Axiosリクエスト失敗:", error.message);
      }
    }
  };

  //ログアウト
  const Logout = () => {
    console.log("ログアウトします。");
    if (window.location.pathname === "/") return;
    props.cookies.remove("jwt-token");
    localStorage.removeItem("roomData");

    window.location.href = "/"; // ログイン画面にリダイレクト
  };

  // ✅ Context を値として渡す
  return (
    <RoomContext.Provider
      value={{
        state,
        roomData,
        toggleView,
        inputChangeLog,
        entering,
        roomErrorMessage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default withCookies(RoomProvider);
