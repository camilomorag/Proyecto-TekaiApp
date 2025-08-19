import { AppDataSource } from "../config/db";
import { Task } from "../entity/Task";
import { taskRepository } from "./TaskRepository";

describe('TaskRepository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  afterEach(async () => {
    await taskRepository.clear();
  });

  it('should create a task', async () => {
    const taskData = {
      titulo: 'Test Task',
      descripcion: 'Test Description',
      estado: 'Creada',
      responsable: 'Test User'
    };

    const task = taskRepository.create(taskData);
    const savedTask = await taskRepository.save(task);

    expect(savedTask).toHaveProperty('id');
    expect(savedTask.titulo).toBe(taskData.titulo);
    expect(savedTask.estado).toBe(taskData.estado);
  });

  it('should find all tasks', async () => {
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

    const tasks = await taskRepository.find();
    expect(tasks.length).toBe(2);
  });
});