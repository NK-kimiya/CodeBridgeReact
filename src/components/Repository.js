import {useContext,useEffect} from 'react'
import { RepositoryContext } from '../context/RepositoryProvider';
import { CategoryContext } from '../context/CategoryProvider';
import RepositoryItem from './RepositoryItem';
const Repository = () => {
  const {
    isModalOpen, setIsModalOpen, repositoryData,
    repoUrl, setRepoUrl, title, setTitle,
    description, setDescription, demoVideo, setDemoVideo,
    RepositoryCategories, handleRepositoryCategory, createRepository,categories,RepositoryFilterCategories,fetchRepositories,repositoryRoom,repositoryCreateError,setRepositoryCreateError,repositoryErrorMessage
} = useContext(RepositoryContext);


const {
    setSelectedCategories,
} = useContext(CategoryContext);

const openModal = () => {
    setIsModalOpen(true);
    setRepositoryCreateError(null);
}
const closeModal = () => setIsModalOpen(false);

const listRepositories = repositoryData.map(repository => {
  return <RepositoryItem key={repository.id} Repository={repository} />;
});

//リポジトリのカテゴリー検索をクリアにする
const RepositoryFilterClear = () => {
    fetchRepositories(repositoryRoom.id);
    setSelectedCategories([])
}


return (
    <div>
        <button className='category-search-btn' onClick={RepositoryFilterCategories}>検索</button>
        <button className='search-clear-btn' onClick={RepositoryFilterClear}>クリア</button>
        <button onClick={openModal} id='repository-create-modal'>+</button>
        {isModalOpen && (
            <div style={modalOverlayStyle}>
                <div id='repository-create-area'>
                    <h2>リポジトリ作成</h2>
                    <input
                        type='text'
                        placeholder='リポジトリURL'
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='タイトル'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder='説明'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='file'
                        onChange={(e) => setDemoVideo(e.target.files[0])}
                    />
                    <div id='repository-category-selected-area'>
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className='repository-category-selected-item'
                                onClick={() => handleRepositoryCategory(category.id)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: RepositoryCategories.includes(category.id) ? 'lightblue' : 'white',
                                }}
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                    <p className='error_message'>{repositoryCreateError}</p>
                    <button onClick={createRepository} id='repository-create-btn'>リポジトリ作成</button>
                    <button onClick={closeModal} id='repository-close-btn'>×</button>
                </div>
            </div>
        )}
        <p className='error_message'>{repositoryErrorMessage}</p>
        <div className='repository-list-wrap'>{listRepositories}</div>
    </div>
);
}

export default Repository

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px',
  position: 'relative'
};

