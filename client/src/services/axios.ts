/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.gravatar.com/v3",
  headers: {
    Authorization: `Bearer ${import.meta.env.GRAVATAR_API_KEY}`,
  },
});

interface AxiosResponseType<T> {
  data: T;
  status: number;
}

interface AxiosErrorResponse {
  response: {
    data: {
      error: any;
    };
  };
}

const handleError = (
  error: AxiosErrorResponse
): {
  message: string;
} => {
  return error?.response?.data?.error || "unknown Error";
};

export const AxiosWrapper = {
  get: <T>(url: string): Promise<AxiosResponseType<T>> => {
    return axiosInstance
      .get<T>(url)
      .then((res) => res)
      .catch((err: AxiosErrorResponse) => {
        return Promise.reject(handleError(err));
      });
  },
};
