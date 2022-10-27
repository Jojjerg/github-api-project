import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, ServerResponse } from "../../models/user.model";
import { IRepos, IOwner } from "../../models/repos.model";

export const githubApi = createApi({
  reducerPath: "github-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        }
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),
    getUserRepos: build.query<IRepos[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`
      })
    })
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
