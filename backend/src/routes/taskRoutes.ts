import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const controller = new TaskController();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Gestión de tareas Kanban
 */

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 */
router.post("/", (req, res) => controller.create(req, res));

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", (req, res) => controller.getAll(req, res));

/**
 * @swagger
 * /api/tareas/{id}:
 *   patch:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Tarea no encontrada
 */
router.patch("/:id", (req, res) => controller.update(req, res));

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;