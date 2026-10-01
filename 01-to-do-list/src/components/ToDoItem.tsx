import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCircle2, Trash2 } from "lucide-react";
import type { ToDo } from "./FormToDo";
import { RenderAvatar } from "./RenderAvatar";

interface ToDoItemProps {
  todo: ToDo;
  toggleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
}

export function ToDoItem({
  todo,
  toggleComplete,
  handleDelete,
}: ToDoItemProps) {
  return (
    <Card
      className={`group relative transition-all duration-300 hover:shadow-md border border-border/60 ${
        todo.completed
          ? "bg-muted/40 opacity-70 border-border/30"
          : "bg-card hover:border-primary/30"
      }`}
    >
      <CardContent className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
        {/* Accionador Checkbox circular personalizado */}
        <button
          type="button"
          onClick={() => toggleComplete(todo.id)}
          aria-label={
            todo.completed ? "Marcar como pendiente" : "Marcar como completada"
          }
          className={`mt-1 shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white shadow-sm"
              : "border-muted-foreground/40 hover:border-primary bg-background"
          }`}
        >
          {todo.completed && <Check className="w-3.5 h-3.5 stroke-3" />}
        </button>

        {/* Contenido Principal de la Tarea */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Avatar Dinámico basado en el ID o título de la tarea */}
              <RenderAvatar seed={todo.id || todo.title} size={26} />

              <h4
                className={`font-semibold text-base leading-snug truncate transition-all ${
                  todo.completed
                    ? "line-through text-muted-foreground decoration-muted-foreground/50"
                    : "text-foreground"
                }`}
              >
                {todo.title}
              </h4>
            </div>

            {/* Badge de Estado */}
            <Badge
              variant={todo.completed ? "secondary" : "outline"}
              className={`text-[11px] font-medium shrink-0 transition-colors ${
                todo.completed
                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                  : "bg-primary/5 text-primary border-primary/20"
              }`}
            >
              {todo.completed ? (
                "Completada"
              ) : (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Pendiente
                </span>
              )}
            </Badge>
          </div>

          {/* Descripción (si existe) */}
          {todo.description && (
            <p
              className={`text-sm leading-relaxed transition-all ${
                todo.completed
                  ? "line-through text-muted-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>

        {/* Botón de Eliminación rápido */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(todo.id)}
          aria-label="Eliminar tarea"
          className="text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 shrink-0 transition-colors h-8 w-8 -mr-1"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

{
  /* Estado Vacío (Sin tareas) */
}
export function NoToDoItem() {
  return (
    <Card className="border-dashed border-2 bg-muted/20 my-4">
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-10 text-center space-y-3">
        <div className="rounded-full bg-primary/10 p-3.5 text-primary ring-8 ring-primary/5">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-lg font-semibold tracking-tight">
            ¡Todo al día!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
            No tienes tareas pendientes por ahora. Disfruta tu tiempo libre o
            agrega una nueva en el formulario superior.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ToDoItem;
