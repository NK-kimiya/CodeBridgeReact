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
    categories,
    RepositoryFilterCategories,
    fetchRepositories,
    repositoryRoom,
    repositoryCreateError,
    setRepositoryCreateError,
    repositoryErrorMessage,
  } = useContext(RepositoryContext);

  const { setSelectedCategories } = useContext(CategoryContext);

  const openModal = () => {
    setIsModalOpen(true);
    setRepositoryCreateError(null);
  };
  const closeModal = () => setIsModalOpen(false);

  const listRepositories = repositoryData.map((repository) => {
    return <RepositoryItem key={repository.id} Repository={repository} />;
  });

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
                  URL
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
                onChange={(e) => setDemoVideo(e.target.files[0])}
              />
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
              <p className="error_message">{repositoryCreateError}</p>
              <button onClick={createRepository} className="btn btn-success">
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
      <p className="error_message">{repositoryErrorMessage}</p>
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
