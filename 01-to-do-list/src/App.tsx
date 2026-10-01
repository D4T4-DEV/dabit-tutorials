import { useState } from "react";
import FormToDo, { type ToDo } from "./components/FormToDo";
import ToDoItem, { NoToDoItem } from "./components/ToDoItem";

function App() {
  const [todoList, setToDoList] = useState<ToDo[]>([]);

  const handleCreate = (data: ToDo) => {
    console.log("Creaste la tarea", data);

    // Guardado logico de la tarea en el arreglo
    setToDoList((prev) => [...prev, data]);
  };

  const toggleComplete = (id: string) => {
    console.log("Cambiaste de estado la tarea con id", id);

    // Busqueda en el arreglo y cambio del booleano
    setToDoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    console.log("Borraste la tarea con id", id);
    // Busqueda en el arreglo y devolución del nuevo arreglo sin dicho elemento
    setToDoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {/* Formulario para crear tareas */}
      <FormToDo onCreate={handleCreate} />

      {/* Renderizado de las tareas */}
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
    </div>
  );
}

export default App;
