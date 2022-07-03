/** @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

export default function useToggleTodoState(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const toggleTodoState = useCallback(
    (todoId: string) => {
      setLoading(true);
      setError(void 0);

      return fetch(`/api/v1/todo/${todoId}/toggleState`, {
        method: "PUT",
      })
        .then((data) => {
          setLoading(false);
          if ([200, 204].includes(data.status)) {
            onSuccess();
          }
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [setLoading, setError, onSuccess]
  );

  return {
    loading,
    error,
    toggleTodoState,
  };
}
