import React from "react";
import { useActions } from "../hooks/actions";
import { IRepos } from "../models/repos.model";

const FavouriteRepoCard = ({ repo }: { repo: IRepos }) => {
  
  const { addFavourite, removeFavourite } = useActions()
  
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo)
  }
  
  return (
    <div className="border py-3 px-5 mb-2 hover:bg-gray-200 transition duration-100">
      <a
        className="flex flex-col gap-3"
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="flex flex-row gap-2 text-sm">
          Forks: <span className="font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        <button
          className="w-max py-2 px-4 bg-red-500 hover:bg-red-600 transition-colors duration-100"
          onClick={removeFromFavourite}
        >
          Remove from favourites
        </button>
      </a>
    </div>
  );
};

export default FavouriteRepoCard;
