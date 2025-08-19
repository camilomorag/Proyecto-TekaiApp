import axios from "axios";
import { CreateTaskInput, Task } from "../types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

export const taskService = {
  async list(): Promise<Task[]> {
    const { data } = await api.get("/api/tareas");
    return data;
  },
  async create(payload: CreateTaskInput): Promise<Task> {
    const { data } = await api.post("/api/tareas", payload);
    return data;
  },
  async update(id: number, partial: Partial<Task>): Promise<Task> {
    const { data } = await api.patch(`/api/tareas/${id}`, partial);
    return data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/api/tareas/${id}`);
  },
};