import { _axios } from "@/config/axios";
import { TLoginData, TLoginResponse } from "./types";
import { API_ROUTES } from "@/config/routes";
import { CONSTANTS } from "@/config/constants";

export async function login(data: TLoginData) {
  const response = await _axios.post<TLoginResponse>(
    API_ROUTES.AUTH.LOGIN,
    data
  );
  localStorage.setItem(CONSTANTS.TOKEN, response.data.token);
  return response.data;
}
