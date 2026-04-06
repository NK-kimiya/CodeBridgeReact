import { useContext, useEffect } from "react";
import { RepositoryContext } from "../context/RepositoryProvider";
import { CategoryContext } from "../context/CategoryProvider";
import RepositoryItem from "./RepositoryItem";
const Repository = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    repositoryData,
    repoUrl,
    setRepoUrl,
    title,
    setTitle,
    description,
    setDescription,
    demoVideo,
    setDemoVideo,
    RepositoryCategories,
    handleRepositoryCategory,
    createRepository,
    isLoading,
    categories,
    RepositoryFilterCategories,
    fetchRepositories,
    repositoryRoom,
    repositoryCreateError,
    setRepositoryCreateError,
    repositoryErrorMessage,
  } = useContext(RepositoryContext);

  const { setSelectedCategories } = useContext(CategoryContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // MP4チェック
    if (file.type !== "video/mp4") {
      setRepositoryCreateError("MP4ファイルのみアップロード可能です。");
      setDemoVideo(null);
      return;
    }

    // サイズチェック（100MB）
    if (file.size > 100 * 1024 * 1024) {
      setRepositoryCreateError("ファイルサイズが大きすぎます（100MB以下）。");
      setDemoVideo(null);
      return;
    }

    // OKならセット
    setRepositoryCreateError(null);
    setDemoVideo(file);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setRepositoryCreateError(null);
  };
  const closeModal = () => setIsModalOpen(false);

  const listRepositories = repositoryData.map((repository) => (
    <RepositoryItem key={repository.id} Repository={repository} />
  ));

  //リポジトリのカテゴリー検索をクリアにする
  const RepositoryFilterClear = () => {
    fetchRepositories(repositoryRoom.id);
    setSelectedCategories([]);
  };

  return (
    <div>
      <button className="btn btn-success" onClick={RepositoryFilterCategories}>
        検索
      </button>
      <button className="btn btn-secondary m-2" onClick={RepositoryFilterClear}>
        クリア
      </button>
      <button
        onClick={openModal}
        id="repository-create-modal"
        className="btn btn-warning text-white"
      >
        +
      </button>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div className="p-3 bg-light">
            <h2>掲示板作成</h2>
            <form>
              <div className="mb-3">
                <label for="exampleInputUrl" className="form-label">
                  URL
                </label>
                <input
                  type="url"
                  id="exampleInputUrl"
                  placeholder="URL"
                  className="form-control"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label for="exampleInputTitle" className="form-label">
                  タイトル
                </label>
                <input
                  type="text"
                  id="exampleInputTitle"
                  placeholder="タイトル"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  説明
                </label>
                <textarea
                  placeholder="説明"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label for="formFile" className="form-label">
                  MP4ファイルを任意で選択してください。サイズは100MBまでです。
                </label>
              </div>
              <input
                type="file"
                id="formFile"
                className="form-control"
                onChange={handleFileChange}
                // onChange={(e) => setDemoVideo(e.target.files[0])}
              />
              <p className="text-danger">{repositoryCreateError}</p>
              <div id="repository-category-selected-area">
                {categories.map((category) => (
                  <div
                    className={`badge rounded-pill p-2 ${
                      RepositoryCategories.includes(category.id)
                        ? "bg-secondary text-white"
                        : "bg-dark text-white"
                    }`}
                    key={category.id}
                    onClick={() => handleRepositoryCategory(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>

              {isLoading && (
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
              <button
                onClick={createRepository}
                className="btn btn-success"
                disabled={isLoading}
              >
                作成する
              </button>
              <br></br>
              <button onClick={closeModal} className="btn btn-link">
                閉じる
              </button>
            </form>
          </div>
        </div>
      )}

      {repositoryErrorMessage && (
        <div className="text-center mt-3">
          <p className="text-danger">取得に失敗しました。</p>

          <button
            className="btn btn-link"
            onClick={() => fetchRepositories(repositoryRoom.id)}
          >
            再取得する
          </button>
        </div>
      )}

      <div className="card">{listRepositories}</div>
    </div>
  );
};

export default Repository;

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  position: "relative",
};
