import { Request, Response } from "express";
import { TaskUseCases } from "../usecases/TaskUseCases";

const taskUseCases = new TaskUseCases();

export class TaskController {
  async getAll(req: Request, res: Response) {
    try {
      const tasks = await taskUseCases.getAllTasks();
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener las tareas" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { titulo, descripcion, estado, responsable } = req.body;

      if (!titulo || !descripcion || !responsable) {
        return res.status(400).json({ error: "Datos inválidos" });
      }

      const newTask = await taskUseCases.createTask({
        titulo,
        descripcion,
        estado,
        responsable,
      });

      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({ error: "Error al crear la tarea" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedTask = await taskUseCases.updateTask(
        Number(req.params.id),
        req.body
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }

      return res.json(updatedTask);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar la tarea" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await taskUseCases.deleteTask(Number(req.params.id));
      return res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar la tarea" });
    }
  }
}
