import React, { useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { deleteTask, moveTaskLocally, rollbackTaskMove, updateTask } from "../store/taskSlice";
import { Estado, Task } from "../types";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const COLUMNS: Estado[] = ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"];

const COLUMN_COLORS: Record<Estado, string> = {
  "Creada": "#4361ee",
  "En progreso": "#4895ef",
  "Bloqueada": "#f72585",
  "Finalizada": "#4cc9f0",
  "Cancelada": "#7209b7"
};

const COLUMN_ICONS: Record<Estado, string> = {
  "Creada": "📝",
  "En progreso": "🚧",
  "Bloqueada": "⛔",
  "Finalizada": "✅",
  "Cancelada": "❌"
};

export default function KanbanBoard() {
  const { items, status } = useSelector((s: RootState) => s.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState<Task | null>(null);

  const grouped = useMemo(() => {
    const map: Record<Estado, Task[]> = { 
      "Creada": [], 
      "En progreso": [], 
      "Bloqueada": [], 
      "Finalizada": [], 
      "Cancelada": [] 
    };
    items.forEach(t => map[t.estado].push(t));
    return map;
  }, [items]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const from = source.droppableId as Estado;
    const to = destination.droppableId as Estado;
    if (from === to) return;

    const id = Number(draggableId);
    dispatch(moveTaskLocally({ id, newEstado: to }));
    try {
      await dispatch(updateTask({ id, partial: { estado: to } })).unwrap();
    } catch {
      dispatch(rollbackTaskMove({ id, prevEstado: from }));
      alert("No se pudo actualizar el estado");
    }
  };

  if (status === "loading") {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div className="kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {COLUMNS.map(col => (
            <Droppable droppableId={col} key={col}>
              {(provided, snapshot) => (
                <div 
                  className={`column ${snapshot.isDraggingOver ? "is-dragging-over" : ""}`}
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  data-status={col}
                  style={{
                    borderTop: `4px solid ${COLUMN_COLORS[col]}`,
                    backgroundColor: snapshot.isDraggingOver ? `${COLUMN_COLORS[col]}15` : 'white'
                  }}
                >
                  <div className="column-header">
                    <h3>
                      <span className="column-icon">{COLUMN_ICONS[col]}</span>
                      {col}
                    </h3>
                    <span 
                      className="count"
                      style={{ backgroundColor: COLUMN_COLORS[col] }}
                    >
                      {grouped[col].length}
                    </span>
                  </div>

                  <div className="tasks-list">
                    {grouped[col].map((t, index) => (
                      <Draggable draggableId={String(t.id)} index={index} key={t.id}>
                        {(prov, snapshot) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className={`task-container ${snapshot.isDragging ? "is-dragging" : ""}`}
                          >
                            <TaskCard
                              task={t}
                              onDelete={(id) => dispatch(deleteTask(id))}
                              onEdit={(task) => setEditing(task)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Tarea</h2>
            <TaskForm
              defaultValues={editing}
              onSubmit={async (data) => {
                await dispatch(updateTask({ id: editing.id, partial: data }));
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}