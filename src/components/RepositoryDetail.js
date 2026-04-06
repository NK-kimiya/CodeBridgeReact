import { useContext, useState, useEffect } from "react";
import { RepositoryContext } from "../context/RepositoryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const RepositoryDetail = () => {
  const { repositoryDetail } = useContext(RepositoryContext);
  const { messageChange } = useContext(RepositoryContext);
  const { message } = useContext(RepositoryContext);
  const { messageSend, isSendingMessage } = useContext(RepositoryContext);
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
      <div className="text-center">
        <p>詳細表示はされていません。</p>
      </div>
    );
  }

  return (
    <div className="repository-detail-area">
      <div className="pt-sm-5 border-bottom">
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
          <video
            key={repositoryDetail.demo_video_url} // ←これが重要
            controls
            className="video-player"
            style={{}}
          >
            <source
              src={repositoryDetail.demo_video_url.replace(
                "/upload/",
                "/upload/f_mp4,vc_h264/",
              )}
              type="video/mp4"
            />
          </video>
        )}
        {repositoryDetail.favorite ? (
          <button
            className="badge rounded-pill text-bg-secondary border-0 p-2 mt-2"
            onClick={() => removeFavoriteRepository(repositoryDetail.id)}
          >
            お気に入り解除
            <FontAwesomeIcon icon={faUserMinus} />
          </button>
        ) : (
          <button
            className="badge rounded-pill text-bg-danger border-0 p-2 mt-2"
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
            <p className="text-center">メッセージはまだありません。</p>
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

        <div className="">
          <div className="d-flex justify-content-center">
            <textarea
              className="form-control w-75"
              value={message}
              onChange={messageChange}
              placeholder="メッセージを入力して下さい。"
            />
          </div>
          <div className="d-flex justify-content-center pt-3">
            <button onClick={messageSend} className="btn btn-warning px-5">
              {isSendingMessage ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  送信中...
                </>
              ) : (
                "投稿"
              )}
            </button>
          </div>
          <p className="error_message">{messageError}</p>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;
