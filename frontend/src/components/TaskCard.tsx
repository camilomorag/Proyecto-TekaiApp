import React from "react";
import { Task } from "../types";

type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
};

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  return (
    <div className="task-card">
      <div className="task-header">
        <strong>{task.titulo}</strong>
        <div className="task-actions">
          <button onClick={() => onEdit?.(task)}>✏️</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      </div>
      <p className="task-desc">{task.descripcion}</p>
      <div className="task-meta">
        <span>👤 {task.responsable}</span>
        <span>🗓 {new Date(task.fechaCreacion).toLocaleString()}</span>
      </div>
    </div>
  );
}