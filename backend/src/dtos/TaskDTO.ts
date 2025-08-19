export interface CreateTaskDTO {
    titulo: string;
    descripcion: string;
    estado: string;
    responsable: string;
  }
  
  export interface UpdateTaskDTO {
    titulo?: string;
    descripcion?: string;
    estado?: string;
    responsable?: string;
  }