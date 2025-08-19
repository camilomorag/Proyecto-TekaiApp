import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entity/Task";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "CAMT2910",
    database: "proyectotekai",
    synchronize: true,
    logging: false,
    entities: [Task],
    migrations: [],
    subscribers: [],
    // Añade estas opciones:
    extra: {
      authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password'),
      }
    }
  });
// Inicializar la conexión
AppDataSource.initialize()
  .then(() => console.log("Conexión a MariaDB establecida"))
  .catch(error => console.log("Error de conexión:", error));