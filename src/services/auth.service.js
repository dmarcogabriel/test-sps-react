import { api } from "../config/api";

export const signIn = async (payload) => {
  try {
    const { token } = await api.post("auth", payload);

    localStorage.setItem("@token", token);

    return getUserMe();
  } catch (e) {
    throw new Error("Falha ao autenticar.");
  }
}

export const getUserMe = async () => {
  try {
    const { data } = await api.get("users/me");

    return data;
  } catch (e) {
    throw new Error("Falha ao buscar meus dados.");
  }
}
