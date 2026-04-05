import React, { useContext } from "react";
import { UNSAFE_shouldHydrateRouteLoader } from "react-router-dom";
import { RepositoryContext } from "../context/RepositoryProvider";

const RepositoryItem = ({ Repository }) => {
  const { setRepositoryDetail } = useContext(RepositoryContext);
  if (!Repository) {
    return <p>Data is not available.</p>;
  }
  return (
    <div className="list-group list-group-flush bg-primary repository-list-area-item ">
      <a
        href="#"
        className="repository-list-area-item text-white text-decoration-none"
        onClick={() => setRepositoryDetail(Repository)}
      >
        <p className="">
          {Repository.readCount > 0 && (
            <span class="badge text-bg-danger m-1">{Repository.readCount}</span>
          )}
          {Repository.title || "No Title"}{" "}
        </p>
      </a>

      {/*--<video controls>
        <source src={`http://localhost:8000${Repository.demo_video}`}></source>
      </video>--*/}
    </div>
  );
};

export default RepositoryItem;
