import axios from "axios";
import { User } from "../types/types";

const API_BASE_URL = "http://localhost:8080/api";

export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  createUser: async (userData: FormData): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateUser: async (id: number, userData: FormData): Promise<User> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  },

  getImageUrl: (fileName: string): string => {
    if (!fileName) return "";
    if (fileName.startsWith("http")) return fileName;
    return `${API_BASE_URL}/users/images/${fileName}`;
  },
};
