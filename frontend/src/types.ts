export type Estado = "Creada" | "En progreso" | "Bloqueada" | "Finalizada" | "Cancelada";

export interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  estado: Estado;
  responsable: string;
  fechaCreacion: string;
}

export interface CreateTaskInput {
  titulo: string;
  descripcion: string;
  estado: Estado;
  responsable: string;
}