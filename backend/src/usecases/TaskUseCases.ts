import { taskRepository } from "../repositories/TaskRepository";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/TaskDTO";
import { Task } from "../entity/Task";

export class TaskUseCases {
  async createTask(data: CreateTaskDTO): Promise<Task> {
    const task = taskRepository.create(data);
    return await taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await taskRepository.find();
  }

  async updateTask(id: number, data: UpdateTaskDTO): Promise<Task | null> {
    await taskRepository.update(id, data);
    return await taskRepository.findOneBy({ id });
  }

  async deleteTask(id: number): Promise<void> {
    await taskRepository.delete(id);
  }
}