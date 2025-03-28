import { _axios } from "@/config/axios";
import { TLoginData } from "./types";
import { API_ROUTES } from "@/config/routes";

export async function login(data: TLoginData) {
  const response = await _axios.post(API_ROUTES.AUTH.REGISTER, data);
  return response.data;
}
