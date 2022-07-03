/** @jsx h */
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { tw } from "@twind";

import useToggleTodoState from "../ui/hooks/useToggleTodoState.tsx";
import { Todo } from "../core/data/models/todo.ts";

export type TodoItemProps = {
  value: Todo;
};

export default function TodoItem(props: TodoItemProps) {
  const { value } = props;

  const [done, setDone] = useState(value.done);

  const onStatusUpdated = useCallback(() => {
    setDone((prev) => !prev);
  }, [setDone]);

  const { loading, error, toggleTodoState } =
    useToggleTodoState(onStatusUpdated);

  const toggleState = useCallback(() => {
    toggleTodoState(value._id.toString());
  }, [value]);

  return (
    <div className={tw`flex mb-4 items-center`}>
      <p className={tw`w-full text-grey-darkest`}>{value.name}</p>
      <button
        disabled={loading}
        onClick={toggleState}
        className={tw`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-green border-green hover:bg-green`}
      >
        {done ? "Mark as not done" : "Mark as done"}
      </button>
      {error}
    </div>
  );
}
