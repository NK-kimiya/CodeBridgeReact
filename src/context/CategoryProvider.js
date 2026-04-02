import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { withCookies } from "react-cookie";
import apiClient from "../apiClient";
export const CategoryContext = createContext();

const CategoryProvider = (props) => {
  const { children } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputCategoryName, setInputCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [categoriesCreateErrorMessage, setCategoriesCreateErrorMessage] =
    useState();
  const [categoriesErrorMessage, setCategoriesErrorMessage] = useState();
  //JWT トークンの取得
  const [cookies] = useCookies(["jwt-token"]);
  const token = cookies["jwt-token"];

  //初期化処理
  useEffect(() => {
    const storedData = localStorage.getItem("roomData");
    if (storedData) {
      setRoomData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (roomData?.id) {
      fetchCategories(roomData.id);
    }
  }, [roomData]);

  //カテゴリ取得
  const fetchCategories = async (roomId) => {
    try {
      setCategoriesErrorMessage(null);
      const response = await apiClient.post(
        "/api/categories/filter/",
        {
          room_id: roomId,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        },
      );
      setCategories(response.data);
    } catch (error) {
      setCategoriesErrorMessage("このルームにはカテゴリが存在しません。");
    }
  };

  //カテゴリ作成
  const createCategory = async () => {
    try {
      const response = await apiClient.post(
        "/api/categories/",
        {
          name: inputCategoryName,
          room: roomData.id,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        },
      );
      setInputCategoryName("");
      setCategories([...categories, response.data]);
      closeModal();
      setCategoriesErrorMessage(null);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.warn("⚠️ トークンが無効、または期限切れです");
          Logout();
        } else {
          setCategoriesCreateErrorMessage(
            "カテゴリ作成に失敗しました。入力が空欄でないか確認して下さい。",
          );
          console.error("リクエストエラー:", error.response.data);
        }
      } else {
        console.error("Axiosリクエスト失敗:", error.message);
      }
    }
  };

  //カテゴリクリック
  const handleCategoryClick = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  //ログアウト

  const Logout = () => {
    console.log("ログアウトします。");
    if (window.location.pathname === "/") return;
    // ✅ ブラウザ全体に状態を記録
    props.cookies.remove("jwt-token");
    localStorage.removeItem("roomData");

    window.location.href = "/"; // ログイン画面にリダイレクト
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoriesCreateErrorMessage(null);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategories,
        setSelectedCategories,
        handleCategoryClick,
        isModalOpen,
        openModal,
        closeModal,
        inputCategoryName,
        setInputCategoryName,
        createCategory,
        categoriesErrorMessage,
        categoriesCreateErrorMessage,
        roomData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default withCookies(CategoryProvider);
