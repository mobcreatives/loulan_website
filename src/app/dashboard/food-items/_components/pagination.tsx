import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";
import { TPaginationProps } from "../types";

const limitData = [10, 25, 50, 100];
export default function Pagination({
  pagination,
  setPagination,
  totalPages,
}: Readonly<TPaginationProps>) {
  async function handleLimitChange(limit: number) {
    setPagination((prev) => ({
      ...prev,
      limit,
    }));
  }
  async function handleNextPageClick() {
    if (pagination.page >= totalPages)
      return setPagination((prev) => ({
        ...prev,
        page: totalPages,
      }));
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }
  async function handlePreviousPageClick() {
    if (pagination.page <= 1)
      return setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  }
  return (
    <div className="flex items-center gap-x-5">
      <div className="flex text-gray-400 items-center gap-x-3">
        <button
          className="cursor-pointer border px-3 py-2 rounded-md hover:text-primary"
          type="button"
          onClick={() => handlePreviousPageClick()}
          disabled={pagination.page <= 1}
        >
          <ChevronLeft />
        </button>
        <span>{pagination.page}</span>
        <button
          className="cursor-pointer border px-3 py-2 rounded-md hover:text-primary"
          type="button"
          onClick={() => handleNextPageClick()}
          disabled={pagination.page >= totalPages}
        >
          <ChevronRight />
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer border px-3 py-2 rounded-md hover:text-primary w-16">
          {pagination.limit}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-17">
          {limitData.map((limit) => (
            <DropdownMenuItem
              key={limit}
              onClick={() => handleLimitChange(limit)}
            >
              {limit}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
