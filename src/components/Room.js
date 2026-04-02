// Room.js
import React, { useContext,useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { RoomContext } from '../context/RoomProvider';  // ✅ ProviderからContextをインポート
import { useNavigate } from 'react-router-dom'; // ✅ react-router の遷移フック
import Nav from './Nav';

const Room = (props) => {
  const { state, toggleView, inputChangeLog, entering,roomErrorMessage} = useContext(RoomContext);
  //const navigate = useNavigate();  // ✅ ページ遷移用
  const token = props.cookies.get('jwt-token'); // ✅ JWTトークンを取得


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
    <div className='room-login-area'>
      <Nav/>
    <div id="entering-area">
      {state.isEnteringView ? (
            <h3>ルームに参加</h3>
        ) : (
          <h3>ルームの新規作成</h3>
        )}
      <form id="entering-area-form" onSubmit={handleSubmit}>
        <small>ルーム名</small>
        <input
            type="text"
            name="name"
            className="entering-area-form-input"
            value={state.credentialsLog.name}
            onChange={inputChangeLog}
        />
        <small>パスワード</small>
        <input
          type="password"
          name="password"
          className="entering-area-form-input"
          value={state.credentialsLog.password}
          onChange={inputChangeLog}
        />

        {/* モード切り替えリンク */}
        <a
          href="#"
          id="entering-area-form-link"
          onClick={toggleView}
        >
          {state.isEnteringView ? '新規作成' : '入室'}
        </a>
        <p>{roomErrorMessage}</p>
        {/* ボタン表示 */}
        {state.isEnteringView ? (
          
          <button className="entering-area-form-button" type="submit">
            入室
          </button>
        ) : (
          <button className="entering-area-form-button" type="submit">
            新規作成
          </button>
        )}
      </form>
    </div>
    </div>
  );
};

export default withCookies(Room);
