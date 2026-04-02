import React, { useContext } from 'react'
import { UNSAFE_shouldHydrateRouteLoader } from 'react-router-dom'
import { RepositoryContext } from '../context/RepositoryProvider';

const RepositoryItem = ({Repository}) => {

  const {
    setRepositoryDetail
  } = useContext(RepositoryContext);
  if (!Repository) {
    return <p>Data is not available.</p>;
  }
  return (
    <div className='repository-item'>
      <a href='#' className='repository-list-area-item' onClick={() => setRepositoryDetail(Repository)}>
      <h3>{Repository.title || 'No Title'}</h3>
      <p>{Repository.description
  ? Repository.description.length > 30
    ? Repository.description.slice(0, 30) + '...'
    : Repository.description
  : 'No Description'}</p>
  <p>{Repository.readCount > 0 && <small>新着{Repository.readCount}件のメッセージ</small>}</p>
      </a>
      
   
     
      {/*--<video controls>
        <source src={`http://localhost:8000${Repository.demo_video}`}></source>
      </video>--*/}
    </div>
  )
}

export default RepositoryItem
