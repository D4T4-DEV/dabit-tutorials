import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PlusCircle, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ToDo } from "./ToDoItem";

interface FormToDoProps {
  onCreate: (data: ToDo) => void;
}

export function FormToDo({ onCreate }: FormToDoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(true);
      return;
    }

    const newTodo: ToDo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    onCreate(newTodo);

    // Reset form state
    setTitle("");
    setDescription("");
    setError(false);

    // Feedback visual efímero de éxito
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 1000);
  };

  // Atajo de teclado: Cmd/Ctrl + Enter para enviar desde la descripción
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) form.requestSubmit();
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm border border-border/60 bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">
              Nueva Tarea
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Añade un pendiente a tu lista de prioridades
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Título */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="title" className="text-sm font-medium">
                Título de la tarea <span className="text-destructive">*</span>
              </Label>
              {error && (
                <span className="text-xs text-destructive flex items-center gap-1 font-medium animate-in fade-in slide-in-from-right-1">
                  <AlertCircle className="w-3 h-3" /> El título es requerido
                </span>
              )}
            </div>

            <Input
              id="title"
              type="text"
              placeholder="Ej: Revisar informe trimestral..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error && e.target.value.trim()) setError(false);
              }}
              className={`transition-all duration-200 focus-visible:ring-2 ${
                error
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : "focus-visible:ring-primary/20"
              }`}
            />
          </div>

          {/* Campo Descripción */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-muted-foreground"
              >
                Descripción{" "}
                <span className="text-xs font-normal text-muted-foreground/70">
                  (Opcional)
                </span>
              </Label>
              <span className="text-[10px] text-muted-foreground/60">
                {description.length}/200
              </span>
            </div>

            <Textarea
              id="description"
              placeholder="Añade detalles, enlaces o notas útiles..."
              value={description}
              maxLength={200}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              className="resize-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
            <p className="text-[11px] text-muted-foreground/70 text-right">
              Tip: Presiona{" "}
              <kbd className="px-1 py-0.5 text-[10px] bg-muted border rounded font-mono">
                Ctrl
              </kbd>{" "}
              +{" "}
              <kbd className="px-1 py-0.5 text-[10px] bg-muted border rounded font-mono">
                Enter
              </kbd>{" "}
              para guardar rápido
            </p>
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            className={`w-full font-medium transition-all duration-200 ${
              isSubmitted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isSubmitted ? (
              <span className="flex items-center justify-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4" /> ¡Tarea agregada!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <PlusCircle className="w-4 h-4" /> Agregar Tarea
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormToDo;
