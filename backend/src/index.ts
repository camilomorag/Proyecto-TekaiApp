import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db";
import taskRoutes from "./routes/taskRoutes";
import setupSwagger from "./config/swagger"; // Nueva importación

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Base de datos conectada");
    
    // Configurar Swagger
    setupSwagger(app); // Nueva línea
    
    app.use("/api/tareas", taskRoutes);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error al iniciar:", error));