import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Kanban TEKAI',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema Kanban de TEKAI',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            titulo: {
              type: 'string',
              example: 'Implementar Swagger',
            },
            descripcion: {
              type: 'string',
              example: 'Agregar documentación automatizada a la API',
            },
            estado: {
              type: 'string',
              enum: ['Creada', 'En progreso', 'Bloqueada', 'Finalizada', 'Cancelada'],
              example: 'En progreso',
            },
            responsable: {
              type: 'string',
              example: 'Juan Henao',
            },
            fechaCreacion: {
              type: 'string',
              format: 'date-time',
              example: '2025-08-15T10:00:00Z',
            },
          },
        },
        CreateTaskInput: {
          type: 'object',
          required: ['titulo', 'descripcion', 'estado', 'responsable'],
          properties: {
            titulo: {
              type: 'string',
              example: 'Implementar Swagger',
            },
            descripcion: {
              type: 'string',
              example: 'Agregar documentación automatizada a la API',
            },
            estado: {
              type: 'string',
              enum: ['Creada', 'En progreso', 'Bloqueada', 'Finalizada', 'Cancelada'],
              example: 'En progreso',
            },
            responsable: {
              type: 'string',
              example: 'Juan Henao',
            },
          },
        },
        UpdateTaskInput: {
          type: 'object',
          properties: {
            titulo: {
              type: 'string',
              example: 'Implementar Swagger (Actualizado)',
            },
            descripcion: {
              type: 'string',
              example: 'Agregar documentación automatizada a la API con mejoras',
            },
            estado: {
              type: 'string',
              enum: ['Creada', 'En progreso', 'Bloqueada', 'Finalizada', 'Cancelada'],
              example: 'Finalizada',
            },
            responsable: {
              type: 'string',
              example: 'María López',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Ruta a tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app: Express): void {
  // Ruta para la documentación Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Ruta para obtener el JSON de Swagger
  app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📖 Documentación Swagger disponible en http://localhost:3001/api-docs`);
}

export default setupSwagger;