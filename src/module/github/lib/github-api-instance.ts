import axios, { AxiosError } from "axios";
import { throwErrorToast } from "core/lib";

export const githubApiInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "accept": "application/vnd.github+json"
  }
});

githubApiInstance.interceptors.response.use(
  undefined,
  (err: AxiosError<{ message: string }>) => {
    const title = err.response?.data?.message ?? err.message;
    throwErrorToast({ title });
    throw err;
  }
);
