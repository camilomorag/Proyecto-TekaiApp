import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Base de datos conectada");
    
    app.use("/api/tareas", taskRoutes);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error al iniciar:", error));