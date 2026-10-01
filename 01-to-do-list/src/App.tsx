import { useState } from "react";
import FormToDo, { type ToDo } from "./components/formToDo";

function App() {
  const [todoList, setToDoList] = useState<ToDo[]>([]);

  const handleCreate = (data: ToDo) => {
    console.log("Creaste la tarea", data);
  };

  const toggleComplete = (id: string) => {
    console.log("Cambiaste de estado la tarea con id", id);
  };

  const handleDelete = (id: string) => {
    console.log("Borraste la tarea con id", id);
  };

  return (
    <div>
      <p>Aqui ira cosas lindas :DDDDD</p>
      <p>Aqui ira cosas lindas :DDDDD</p>
    </div>
  );
}

export default App;
