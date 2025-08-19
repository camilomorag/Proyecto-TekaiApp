import React, { useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { deleteTask, moveTaskLocally, rollbackTaskMove, updateTask } from "../store/taskSlice";
import { Estado, Task } from "../types";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const COLUMNS: Estado[] = ["Creada", "En progreso", "Bloqueada", "Finalizada", "Cancelada"];

export default function KanbanBoard() {
  const { items } = useSelector((s: RootState) => s.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState<Task | null>(null);

  const grouped = useMemo(() => {
    const map: Record<Estado, Task[]> = { "Creada": [], "En progreso": [], "Bloqueada": [], "Finalizada": [], "Cancelada": [] };
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

  return (
    <div className="kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {COLUMNS.map(col => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="column-header">
                    <h3>{col}</h3>
                    <span className="count">{grouped[col].length}</span>
                  </div>

                  {grouped[col].map((t, index) => (
                    <Draggable draggableId={String(t.id)} index={index} key={t.id}>
                      {(prov) => (
                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                          <TaskCard
                            task={t}
                            onDelete={(id) => dispatch(deleteTask(id))}
                            onEdit={(task) => setEditing(task)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
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