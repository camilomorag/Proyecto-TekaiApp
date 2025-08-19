import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskService } from "../services/taskService";
import { CreateTaskInput, Estado, Task } from "../types";

type Status = "idle" | "loading" | "error";

interface TaskState {
  items: Task[];
  status: Status;
  error?: string;
}

const initialState: TaskState = { items: [], status: "idle" };

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  return await taskService.list();
});

export const createTask = createAsyncThunk("tasks/create", async (payload: CreateTaskInput) => {
  return await taskService.create(payload);
});

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, partial }: { id: number; partial: Partial<Task> }) => {
    return await taskService.update(id, partial);
  }
);

export const deleteTask = createAsyncThunk("tasks/delete", async (id: number) => {
  await taskService.remove(id);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    moveTaskLocally: (state, action: PayloadAction<{ id: number; newEstado: Estado }>) => {
      const t = state.items.find(x => x.id === action.payload.id);
      if (t) t.estado = action.payload.newEstado;
    },
    rollbackTaskMove: (state, action: PayloadAction<{ id: number; prevEstado: Estado }>) => {
      const t = state.items.find(x => x.id === action.payload.id);
      if (t) t.estado = action.payload.prevEstado;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, s => { s.status = "loading"; })
      .addCase(fetchTasks.fulfilled, (s, a) => { s.status = "idle"; s.items = a.payload; })
      .addCase(fetchTasks.rejected, (s, a) => { s.status = "error"; s.error = String(a.error.message || "Error"); })
      .addCase(createTask.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(updateTask.fulfilled, (s, a) => {
        const idx = s.items.findIndex(t => t.id === a.payload.id);
        if (idx >= 0) s.items[idx] = a.payload;
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.items = s.items.filter(t => t.id !== a.payload);
      });
  },
});

export const { moveTaskLocally, rollbackTaskMove } = taskSlice.actions;
export default taskSlice.reducer;