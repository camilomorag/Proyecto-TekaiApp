import { AppDataSource } from "../config/db";
import { Task } from "../entity/Task";

export const taskRepository = AppDataSource.getRepository(Task);