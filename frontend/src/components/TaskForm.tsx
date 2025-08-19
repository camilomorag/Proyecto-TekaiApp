import React, { useEffect, useState } from "react";
import { CreateTaskInput, Estado, Task } from "../types";

const ESTADOS: Estado[] = ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"];
const RESPONSABLES = ["Juan Henao", "María López", "Carlos Ruiz", "Ana Torres"];

type Props = {
  onSubmit: (data: CreateTaskInput) => void;
  defaultValues?: Task;
  onCancel?: () => void;
};

export default function TaskForm({ onSubmit, defaultValues, onCancel }: Props) {
  const [titulo, setTitulo] = useState(defaultValues?.titulo || "");
  const [descripcion, setDescripcion] = useState(defaultValues?.descripcion || "");
  const [estado, setEstado] = useState<Estado>(defaultValues?.estado || "Creada");
  const [responsable, setResponsable] = useState(defaultValues?.responsable || RESPONSABLES[0]);

  useEffect(() => {
    if (defaultValues) {
      setTitulo(defaultValues.titulo);
      setDescripcion(defaultValues.descripcion);
      setEstado(defaultValues.estado);
      setResponsable(defaultValues.responsable);
    }
  }, [defaultValues]);

  return (
    <form
      className="task-form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ titulo, descripcion, estado, responsable });
      }}
    >
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
      <div className="row">
        <select value={estado} onChange={e => setEstado(e.target.value as Estado)}>
          {ESTADOS.map(es => <option key={es} value={es}>{es}</option>)}
        </select>
        <select value={responsable} onChange={e => setResponsable(e.target.value)}>
          {RESPONSABLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className="row">
        <button type="submit">{defaultValues ? "Guardar cambios" : "Crear tarea"}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}