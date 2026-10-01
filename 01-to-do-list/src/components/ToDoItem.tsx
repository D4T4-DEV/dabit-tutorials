import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export interface ToDo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ToDoItemProps {
  todo: ToDo;
  toggleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
}

function ToDoItem({ todo, toggleComplete, handleDelete }: ToDoItemProps) {
  return (
    <Card
      className={`transition-all ${todo.completed ? "opacity-60 bg-muted/50" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle
            className={`text-lg font-semibold ${
              todo.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </CardTitle>
          <Badge variant={todo.completed ? "secondary" : "default"}>
            {todo.completed ? "Completada" : "Pendiente"}
          </Badge>
        </div>
      </CardHeader>

      {todo.description && (
        <CardContent className="pb-3 text-sm text-muted-foreground">
          <p className={todo.completed ? "line-through" : ""}>
            {todo.description}
          </p>
        </CardContent>
      )}

      <CardFooter className="flex gap-2 pt-0">
        <Button
          variant={todo.completed ? "outline" : "default"}
          size="sm"
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.completed ? "Marcar como pendiente" : "Completar"}
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(todo.id)}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}

export function NoToDoItem() {
  return (
    <Card className="border-dashed border-2 bg-muted/30">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-3">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium tracking-tight">¡Todo al día!</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            No tienes tareas pendientes por ahora. Disfruta tu tiempo libre o
            agrega una nueva.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ToDoItem;
