import { Request, Response } from 'express';
import { TaskController } from './TaskController';
import { TaskUseCases } from '../usecases/TaskUseCases';
import { AppDataSource } from '../config/db';

describe('TaskController', () => {
  let controller: TaskController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeAll(async () => {
    await AppDataSource.initialize();
    controller = new TaskController();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('create', () => {
    it('should create a task and return 201 status', async () => {
      mockRequest.body = {
        titulo: 'Test Task',
        descripcion: 'Test Description',
        estado: 'Creada',
        responsable: 'Test User'
      };

      await controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Test Task',
          estado: 'Creada'
        })
      );
    });

    it('should return 400 for invalid input', async () => {
      mockRequest.body = {
        titulo: '', // Invalid - empty title
        descripcion: 'Test Description',
        estado: 'Invalid', // Invalid state
        responsable: 'Test User'
      };

      await controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(String)
        })
      );
    });
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      await controller.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).not.toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
});