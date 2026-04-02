import React, { useState,useContext,useEffect, use } from 'react'
import { CategoryContext } from '../context/CategoryProvider';
import { FaTag } from "react-icons/fa";

const Category = () => {

  const {
    categories,
    selectedCategories,
    handleCategoryClick,
    isModalOpen,
    openModal,
    closeModal,
    inputCategoryName,
    setInputCategoryName,
    createCategory,
    categoriesErrorMessage,
    categoriesCreateErrorMessage,
  } = useContext(CategoryContext);
  return (
    <div>
    <p className='error_message'>{categoriesErrorMessage}</p>
    <div id='category_area'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='category_area_item'
          onClick={() => handleCategoryClick(category.id)}
          style={{
            cursor: 'pointer',
            backgroundColor: selectedCategories.includes(category.id) ? 'lightblue' : 'white',
          }}
        >
          {category.name}
        </div>
      ))}
    </div>

    <button onClick={openModal} id='category-modal-btn'>
      <FaTag /> カテゴリ追加
    </button>

    {isModalOpen && (
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle}>
          <h2>カテゴリ作成</h2>
          <input
            type='text'
            placeholder='カテゴリ名'
            value={inputCategoryName}
            onChange={(e) => setInputCategoryName(e.target.value)}
          />
          <button onClick={createCategory}>カテゴリ作成</button>
          <p className='error_message'>{categoriesCreateErrorMessage}</p>
          <button onClick={closeModal} style={closeButtonStyle}>×</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default Category;

const modalOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };
  
  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    position: 'relative'
  };
  
  const closeButtonStyle = {
    background: 'transparent',
    fontSize: '18px',
    cursor: 'pointer'
  };