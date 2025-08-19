import { CreateTaskDTO } from "../dtos/TaskDTO";

export function validateTaskInput(data: CreateTaskDTO) {
  if (!data.titulo || !data.descripcion || !data.estado || !data.responsable) {
    throw new Error("Todos los campos son obligatorios");
  }
  
  if (data.titulo.length > 100) {
    throw new Error("El título no puede exceder los 100 caracteres");
  }
  
  const estadosValidos = ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"];
  if (!estadosValidos.includes(data.estado)) {
    throw new Error("Estado no válido");
  }
}