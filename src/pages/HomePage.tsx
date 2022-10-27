import React, { useState, useEffect } from "react";
import RepoCard from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const debounced = useDebounce(search);

  const {
    isLoading: areUserLoading,
    isError: usersError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [
    fetchRepos,
    { isLoading: areReposLoading, isError: reposError, data: repos },
  ] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="flex flex-col items-center pt-10 mx-auto h-screen w-full gap-10">
      {usersError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2 outline-blue-300"
          placeholder="Search for Github username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className="list-none abosolute top-[42px] right-0 max-h-[200px] shadow-sm bg-white overflow-y-auto">
            {areUserLoading && <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-200 transition duration-100 cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
      </div>

      {reposError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="flex flex-col w-[560px] max-h-[470px] overflow-y-auto">
        {areReposLoading && <p className="text-center">Loading...</p>}
        {repos?.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
