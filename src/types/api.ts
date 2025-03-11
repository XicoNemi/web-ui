import type { User } from "@/types/user";

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ProfileResponse {
  message: string;
  user: User;
}
