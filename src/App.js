import React, { useContext } from "react";
import "./App.css";
import "./css/Login.css";
import "./css/Nav.css";
import "./css/Room.css";
import "./css/Category.css";
import "./css/Repository.css";
import Nav from "./components/Nav";
import Category from "./components/Category";
import Repository from "./components/Repository";
import RepositoryDetail from "./components/RepositoryDetail";
import { CategoryContext } from "./context/CategoryProvider";
function App() {
  const { roomData } = useContext(CategoryContext);
  return (
    <div className="App">
      <Nav />
      <h3 className="room-name-title">
        ルームTOP<br></br>
        <small>「{roomData?.name}」のルームに入室しています。</small>
      </h3>
      <div className="main-area">
        <div className="repository-detail-area">
          <RepositoryDetail />
        </div>
        <div className="repository-list-area">
          <Category />
          <Repository />
        </div>
      </div>
    </div>
  );
}

export default App;
