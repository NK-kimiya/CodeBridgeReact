import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import { CookiesProvider } from "react-cookie";
import Room from "./components/Room";
import FavoriteRepository from "./components/FavoriteRepository";
import RoomProvider from "./context/RoomProvider";
import CategoryProvider from "./context/CategoryProvider";
import RepositoryProvider from "./context/RepositoryProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RoomProvider>
    <CategoryProvider>
      <RepositoryProvider>
        <BrowserRouter>
          <CookiesProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/room" element={<Room />} />
              <Route
                path="/app"
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              />
              <Route
                path="/favorite"
                element={
                  <RequireAuth>
                    <FavoriteRepository />
                  </RequireAuth>
                }
              />
            </Routes>
          </CookiesProvider>
        </BrowserRouter>
      </RepositoryProvider>
    </CategoryProvider>
  </RoomProvider>, //ソケット通信は画面遷移をしても切断したくないので、RoomProviderは一番外
);

//コンポーネント
//「Reactでは、外にあるコンポーネント（親階層）は、内側のコンポーネント（子階層）とは関係なく“常にマウントされ続ける”」
//親階層にあるProviderやコンポーネントは、子階層（ページや部品）が切り替わってもアンマウントされない
//そのため、親階層の useEffect() などはアプリが動いている間 ずっと生きている
//子コンポーネントが画面に表示された時点で、すでに親の処理は始まっている状態
//画面遷移やコンポーネントが非表示になるとアンマウント状態になる
//🔁 画面遷移しても状態や通信を維持したい場合は、	index.jsの最外層にコンポーネントをおく
/*
Reactはツリー構造で親子関係を決める
<RepositoryProvider>           ← 親（状態や関数を持っている）
  <Repository />               ← 子（Context経由で使う）
</RepositoryProvider> 

App.js の return の中で <Room /> を呼び出しているなら、
✅ App.js が親で、Room が子です！

、propsで関数やデータを渡している側が「親」、
**それを受け取って使う側が「子」**
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
