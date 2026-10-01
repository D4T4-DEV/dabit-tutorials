import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // ID único para esta instancia del hook para evitar re-procesar eventos de sí mismo
  const instanceId = useRef(Math.random().toString(36).substring(2, 9));

  // Referencia al initialValue para evitar recrear la función readValue
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValueRef.current;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValueRef.current;
    } catch (error) {
      console.warn(`Error al leer la clave de localStorage "${key}":`, error);
      return initialValueRef.current;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(`Intento de setear "${key}" en un entorno sin window.`);
        return;
      }

      try {
        setStoredValue((prevValue) => {
          const newValue = value instanceof Function ? value(prevValue) : value;
          window.localStorage.setItem(key, JSON.stringify(newValue));

          // Notificar a OTRAS instancias de la misma pestaña mediante CustomEvent
          window.dispatchEvent(
            new CustomEvent("local-storage-update", {
              detail: { key, senderId: instanceId.current },
            }),
          );

          return newValue;
        });
      } catch (error) {
        console.warn(
          `Error al guardar la clave "${key}" en localStorage:`,
          error,
        );
      }
    },
    [key],
  );

  useEffect(() => {
    // Sincronización en la misma pestaña (otras instancias del hook)
    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{
        key: string;
        senderId: string;
      }>;

      // Si el evento viene de esta misma instancia del hook, lo ignoramos
      if (customEvent.detail.senderId === instanceId.current) return;
      if (customEvent.detail.key !== key) return;

      setStoredValue(readValue());
    };

    // Sincronización entre PESTAÑAS DISTINTAS (evento nativo del navegador)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key !== key) return;
      setStoredValue(readValue());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage-update", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage-update", handleCustomUpdate);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}
