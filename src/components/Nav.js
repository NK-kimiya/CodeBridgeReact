import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { withCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
const Nav = (props) => {
  const [subNavToggle, setSubNavToggle] = useState(false);

  // ✅ 値を反転する関数
  const Logout = () => {
    props.cookies.remove("jwt-token");
    localStorage.removeItem("roomData");
    window.location.href = "/"; // ログイン画面へ
  };

  //ログアウト
  const roomLogout = () => {
    localStorage.removeItem("roomData");
    window.location.href = "/room"; // ログイン画面にリダイレクト
  };
  const toggleSubNav = () => {
    setSubNavToggle((prev) => !prev);
  };
  return (
    <nav>
      <h1>Code Bridge</h1>
      <button onClick={Logout}>ログアウト</button>
      <div className={subNavToggle ? "sub-nav-area" : "sub-nav-area-none"}>
        {subNavToggle ? (
          <button onClick={toggleSubNav} className="sub-nav-toggle-btn">
            ＜
          </button>
        ) : (
          <button onClick={toggleSubNav} className="sub-nav-toggle-btn">
            ＞
          </button>
        )}

        <ul>
          {subNavToggle ? (
            <li>
              <a href="/app">ルームTOP</a>
            </li>
          ) : (
            <li>
              <a href="/app">
                <FontAwesomeIcon icon={faHouse} />
              </a>
            </li>
          )}

          {subNavToggle ? (
            <li>
              <a href="/favorite">お気に入り</a>
            </li>
          ) : (
            <li>
              <a href="/favorite">
                <FontAwesomeIcon icon={faThumbsUp} />
              </a>
            </li>
          )}

          {subNavToggle ? (
            <li>
              <a href="#" onClick={roomLogout}>
                ルーム退出
              </a>
            </li>
          ) : (
            <li>
              <a href="#" onClick={roomLogout}>
                <FontAwesomeIcon icon={faDoorOpen} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withCookies(Nav);
