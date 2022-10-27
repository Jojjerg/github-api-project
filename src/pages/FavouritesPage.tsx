import React from "react";
import FavouriteRepoCard from "../components/FavouriteRepoCard";
import { useAppSelector } from "../hooks/redux";

const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0)
    return <p className="text-center pt-10">No items.</p>;

  return (
    <div className="flex flex-col items-center pt-10 mx-auto h-screen w-full">
      <ul className="flex-flex-col gap-10 list-none w-[560px]">
        {favourites?.map((f) => (
          <FavouriteRepoCard repo={f} key={f.id} />
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
