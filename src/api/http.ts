import axios, { AxiosError } from "axios";
import { env } from "../lib/env";
import type { ApiErrorBody } from "../types/api";

export class ApiError extends Error {
  public status: number;
  public body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.status = status;
    this.message = message;
    this.body = body;
    this.name = "ApiError";
  }
}

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ?? error.message ?? "Network error";
    return Promise.reject(new ApiError(status, message, error.response?.data));
  },
);
