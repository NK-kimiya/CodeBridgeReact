import { useContext, useState, useEffect } from "react";
import { RepositoryContext } from "../context/RepositoryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../config";
const RepositoryDetail = () => {
  const { repositoryDetail } = useContext(RepositoryContext);
  const { messageChange } = useContext(RepositoryContext);
  const { message } = useContext(RepositoryContext);
  const { messageSend } = useContext(RepositoryContext);
  const { fetchmessage } = useContext(RepositoryContext);
  const { addFavoriteRepository } = useContext(RepositoryContext);
  const { removeFavoriteRepository } = useContext(RepositoryContext);

  const { messageError, fetchMessageError, favoriteError } =
    useContext(RepositoryContext);
  useEffect(() => {
    //console.log("受取っているメッセージ",fetchmessage);
  }, [fetchmessage]);

  useEffect(() => {
    console.log("詳細選択のリポジトリ", repositoryDetail);
  }, [repositoryDetail]);

  if (
    !repositoryDetail ||
    !repositoryDetail.title ||
    !repositoryDetail.description
  ) {
    // データが不足しているか、存在しない場合はこちらを表示
    return (
      <div className="git-icon">
        <FontAwesomeIcon icon={faGithub} />
        <p>詳細表示はされていません。</p>
      </div>
    );
  }

  return (
    <div>
      <div className="repository-detail-area">
        <h2 className="repository-detail-area-title">
          {repositoryDetail.title}
        </h2>
        <p className="repository-detail-area-description">
          {repositoryDetail.description}
        </p>
        <a href={repositoryDetail.url} className="repository-detail-area-link">
          {repositoryDetail.url}
        </a>
        {repositoryDetail.demo_video_url && (
          <video controls className="repository-detail-area-video">
            <source src={repositoryDetail.demo_video_url} type="video/mp4" />
          </video>
        )}
        {repositoryDetail.favorite ? (
          <button
            className="repository-favorite-delete-btn"
            onClick={() => removeFavoriteRepository(repositoryDetail.id)}
          >
            お気に入り解除
            <FontAwesomeIcon icon={faUserMinus} />
          </button>
        ) : (
          <button
            className="repository-favorite-add-btn"
            onClick={() => addFavoriteRepository(repositoryDetail.id)}
          >
            お気に入りに追加
            <FontAwesomeIcon icon={faHeart} />
          </button>
        )}
        <p className="error_message">{favoriteError}</p>
      </div>
      <div id="chat-notice-area"></div>
      <div id="chat-area">
        <div id="message-list-area">
          <p className="error_message">{fetchMessageError}</p>
          {fetchmessage.filter((msg) => msg.repository === repositoryDetail.id)
            .length === 0 ? (
            <p>メッセージはまだありません。</p>
          ) : (
            fetchmessage
              .filter((msg) => msg.repository === repositoryDetail.id)
              .map((message) => (
                <div key={message.id}>
                  <p>
                    <strong>{message.user_name}</strong>
                  </p>
                  <p>{new Date(message.created_at).toLocaleString("ja-JP")}</p>
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    {message.content}
                  </p>
                  <hr />
                </div>
              ))
          )}
        </div>

        <div id="message-send-area">
          <textarea
            value={message}
            onChange={messageChange}
            placeholder="メッセージを入力して下さい。"
          />
          <p className="error_message">{messageError}</p>
          <button onClick={messageSend}>送信</button>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;
