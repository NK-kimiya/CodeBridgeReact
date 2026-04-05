import React, { useContext } from "react";
import "./App.css";
// import "./css/Nav.css";
// import "./css/Room.css";
// import "./css/Category.css";
// import "./css/Repository.css";
import Nav from "./components/Nav";
import Category from "./components/Category";
import Repository from "./components/Repository";
import RepositoryDetail from "./components/RepositoryDetail";
import { CategoryContext } from "./context/CategoryProvider";
function App() {
  const { roomData } = useContext(CategoryContext);
  return (
    <div className="row g-0">
      <button
        className="btn d-md-block d-lg-none text-dark fs-3 position-fixed bottom-0 end-0 text-end"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
      >
        ☰
      </button>
      <div className="col-xl-2 col-lg-3 col-md-2 ">
        <Nav />
      </div>
      <div
        className="offcanvas-md offcanvas-start bg-light col-xl-2 col-lg-2  col-md-2 col-sm-2 p-0 vh-100 overflow-auto"
        tabindex={-1}
        id="sidebar"
      >
        <button
          className="btn d-md-block d-lg-none pt-1 text-dark fs-3 text-start"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
        >
          ×
        </button>

        <Category />
        <Repository />
      </div>
      <div className="col-xl-8 col-lg-7 col-md-8  col-sm-12  p-0 vh-100 overflow-auto ">
        <p className="room-name-title bg-light">
          <small>「{roomData?.name}」のルームに入室しています。</small>
        </p>
        <RepositoryDetail />
      </div>
    </div>
  );
}

export default App;
