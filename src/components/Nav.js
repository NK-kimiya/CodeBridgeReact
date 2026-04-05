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
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top d-md-none d-sm-block">
        <div className="container-fluid">
          <h2 className="text-center text-white">CODE BRIDGE</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div
            className="offcanvas offcanvas-end bg-dark"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body ">
              <button onClick={Logout} className="btn btn-primary m-2">
                ログアウト
              </button>
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item p-2">
                  <a href="/app" className="text-white ">
                    ルームTOP
                  </a>
                </li>
                <li className="nav-item p-2">
                  <a href="/favorite" className="text-white ">
                    お気に入り
                  </a>
                </li>
                <li className="nav-item p-2">
                  <a href="#" onClick={roomLogout} className="text-white">
                    ルーム退出
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <nav className="bg-dark min-vh-100 d-none d-md-block">
        <h2 className="text-white text-center p-3">CODE BRIDGE</h2>
        <div className="d-flex  flex-column justify-content-center align-items-center">
          <button onClick={Logout} className="btn btn-primary m-2">
            ログアウト
          </button>
          <ul className="ps-0 list-unstyled text-center">
            <li className="pt-2">
              <a href="/app" className="text-white ">
                ルームTOP
              </a>
            </li>

            <li className="pt-2">
              <a href="/favorite" className="text-white ">
                お気に入り
              </a>
            </li>

            <li className="pt-2">
              <a href="#" onClick={roomLogout} className="text-white">
                ルーム退出
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withCookies(Nav);
