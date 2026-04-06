import React, { useContext, useEffect, useState } from "react";
import { RepositoryContext } from "../context/RepositoryProvider";
import RepositoryItem from "./RepositoryItem";
import RepositoryDetail from "./RepositoryDetail";
import Nav from "./Nav";
const FavoriteRepository = () => {
  const {
    fetchFavoriteRepositories,
    favoriteRepositories,
    isLoadingFavorites,
  } = useContext(RepositoryContext);

  useEffect(() => {
    fetchFavoriteRepositories();
  }, []);

  const listRepositories = isLoadingFavorites ? (
    // ① ローディング中
    <div className="text-center mt-3">
      <div className="spinner-border"></div>
    </div>
  ) : favoriteRepositories.length === 0 ? (
    // ② データなし
    <p className="text-center mt-3">お気に入りはありません</p>
  ) : (
    // ③ データあり
    favoriteRepositories.map((repository) => (
      <RepositoryItem key={repository.id} Repository={repository} />
    ))
  );
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
        <div className="repository-list-area">
          <div>{listRepositories}</div>
        </div>
      </div>
      <div className="col-xl-8 col-lg-7 col-md-8  col-sm-12  p-0 vh-100 overflow-auto ">
        <p className="room-name-title bg-light text-center">お気に入り</p>
        <RepositoryDetail />
      </div>
    </div>
  );
};

export default FavoriteRepository;
