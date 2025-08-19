import { Request, Response } from "express";
import { TaskUseCases } from "../usecases/TaskUseCases";
import { validateTaskInput } from "../validators/TaskValidator";

const taskUseCases = new TaskUseCases();

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      validateTaskInput(req.body);
      const task = await taskUseCases.createTask(req.body);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const tasks = await taskUseCases.getAllTasks();
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await taskUseCases.updateTask(Number(req.params.id), req.body);
      if (!updated) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await taskUseCases.deleteTask(Number(req.params.id));
      res.json({ message: "Tarea eliminada" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}