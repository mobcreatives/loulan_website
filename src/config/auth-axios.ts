import { useLocalStorage } from "@/hooks/use-local-storage";
import { _axios } from "./axios";
import { CONSTANTS } from "./constants";

export function useAuthAxios() {
  const { getItem } = useLocalStorage();
  _axios.defaults.headers.Authorization = `Bearer ${getItem(CONSTANTS.TOKEN)}`;
  return { _axios };
}
