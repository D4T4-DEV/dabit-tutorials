import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface ToDo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface FormToDoProps {
  onCreate: (data: ToDo) => void;
}

function FormToDo({ onCreate }: FormToDoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo: ToDo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    };

    onCreate(newTodo);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Campo Título */}
      <div className="space-y-2">
        <Label htmlFor="title">Título de la tarea</Label>
        <Input
          id="title"
          type="text"
          placeholder="Escribe el título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Campo Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción (opcional)</Label>
        <Textarea
          id="description"
          placeholder="Escribe una descripción..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Botón de envío */}
      <Button type="submit" className="w-full">
        Agregar Tarea
      </Button>
    </form>
  );
}

export default FormToDo;
