import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../components/TaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { AppDispatch, RootState } from "../store";
import { createTask, fetchTasks } from "../store/taskSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((s: RootState) => s.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Kanban de Tareas</h1>
      <TaskForm onSubmit={(data) => dispatch(createTask(data))} />
      {status === "loading" ? <p>Cargando…</p> : <KanbanBoard />}
    </div>
  );
}