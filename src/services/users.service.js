import { api } from "../config/api";

export const createUser = async (payload) => {
  try {
    const { message } = await api.post("users", payload);

    return message;
  } catch(e) {
    throw new Error("Falha ao listar usuários.");
  }
}

export const getUsers = async () => {
  try {
    const { data } = await api.get("users");

    return data;
  } catch(e) {
    throw new Error("Falha ao listar usuários.");
  }
}

export const getUserById = async (userId) => {
  try {
    const { data } = await api.get(`users/${userId}`);

    return data;
  } catch(e) {
    throw new Error("Falha ao buscar usuário.");
  }
}

export const updateUser = async (userId, payload) => {
  try {
    const { message } = await api.patch(`users/${userId}`, payload);

    return message;
  } catch(e) {
    throw new Error("Falha ao atualizar usuário.");
  }
}

export const deleteUser = async (userId) => {
  try {
    const { message } = await api.delete(`users/${userId}`);

    return message;
  } catch(e) {
    throw new Error("Falha ao atualizar usuário.");
  }
}