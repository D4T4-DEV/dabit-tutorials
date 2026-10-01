import FormToDo, { type ToDo } from "./components/FormToDo";
import ToDoItem, { NoToDoItem } from "./components/ToDoItem";
import { ListTodo } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState } from "react";

function App() {
  // Estado sin persistencia
  const [todoList, setToDoList] = useState<ToDo[]>([]);

  // Estado con persistencia con el hook
  // const [todoList, setToDoList] = useLocalStorage<ToDo[]>("app_todo_list", []);

  const handleCreate = (data: ToDo) => {
    console.log("Recibi la accion de crear una tarea con datos:", data);
    setToDoList((prev) => [data, ...prev]); // Colocamos la nueva tarea al inicio
  };

  const toggleComplete = (id: string) => {
    console.log("Recibi la accion Completar o No completada con el id", id);

    setToDoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    console.log("Recibi la accion de borrar con el id", id);
    setToDoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 py-8 px-4 sm:px-6">
      <main className="max-w-2xl mx-auto space-y-6">
        {/* Header Principal */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 text-primary rounded-2xl mb-1 ring-8 ring-primary/5">
            <ListTodo className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Gestor de Tareas
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Organiza tus actividades diarias, prioriza pendientes y monitorea tu
            progreso.
          </p>
        </header>

        {/* Formulario para Crear Tarea */}
        <FormToDo onCreate={handleCreate} />

        {/* Renderizado de Tareas */}
        <div className="space-y-3">
          {todoList.length === 0 ? (
            <NoToDoItem />
          ) : (
            todoList.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
