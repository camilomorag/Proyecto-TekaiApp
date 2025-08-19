import { TaskUseCases } from "./TaskUseCases";
import { taskRepository } from "../repositories/TaskRepository";
import { AppDataSource } from "../config/db";

describe('TaskUseCases', () => {
  let taskUseCases: TaskUseCases;

  beforeAll(async () => {
    await AppDataSource.initialize();
    taskUseCases = new TaskUseCases();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  afterEach(async () => {
    await taskRepository.clear();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const taskData = {
        titulo: 'New Task',
        descripcion: 'Task Description',
        estado: 'Creada',
        responsable: 'John Doe'
      };

      const task = await taskUseCases.createTask(taskData);
      
      expect(task).toHaveProperty('id');
      expect(task.titulo).toBe(taskData.titulo);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      await taskRepository.save([
        taskRepository.create({
          titulo: 'Task 1',
          descripcion: 'Desc 1',
          estado: 'Creada',
          responsable: 'User 1'
        }),
        taskRepository.create({
          titulo: 'Task 2',
          descripcion: 'Desc 2',
          estado: 'En progreso',
          responsable: 'User 2'
        })
      ]);

      const tasks = await taskUseCases.getAllTasks();
      expect(tasks.length).toBe(2);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const task = await taskRepository.save(
        taskRepository.create({
          titulo: 'Original Task',
          descripcion: 'Original Desc',
          estado: 'Creada',
          responsable: 'Original User'
        })
      );

      const updated = await taskUseCases.updateTask(task.id, {
        titulo: 'Updated Task',
        estado: 'En progreso'
      });

      expect(updated?.titulo).toBe('Updated Task');
      expect(updated?.estado).toBe('En progreso');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = await taskRepository.save(
        taskRepository.create({
          titulo: 'Task to delete',
          descripcion: 'Desc',
          estado: 'Creada',
          responsable: 'User'
        })
      );

      await taskUseCases.deleteTask(task.id);
      const found = await taskRepository.findOneBy({ id: task.id });
      expect(found).toBeNull();
    });
  });
});