"use client";

import axios from "axios";
import { BASE_URL } from "./config";

export const _axios = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});
