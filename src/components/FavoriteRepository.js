import React, { useContext,useEffect,useState } from 'react';
import { RepositoryContext } from '../context/RepositoryProvider';
import RepositoryItem from './RepositoryItem';
import RepositoryDetail from './RepositoryDetail';
import Nav from './Nav';
const FavoriteRepository = () => {
  const {fetchFavoriteRepositories,favoriteRepositories} = useContext(RepositoryContext);

  useEffect(() => {
    fetchFavoriteRepositories();
  },[])

  const listRepositories = favoriteRepositories.map(repository => {
    return <RepositoryItem key={repository.id} Repository={repository} />;
  });
  return (
    <div>
      <Nav/>
      <h3 className='room-name-title'>お気に入り</h3>
      <div className='main-area'>
        <div className='repository-detail-area'>
          <RepositoryDetail/>
        </div>
        <div className='repository-list-area'>
          <div>{listRepositories}</div>
        </div>
      </div>
    </div>
  )
}

export default FavoriteRepository
