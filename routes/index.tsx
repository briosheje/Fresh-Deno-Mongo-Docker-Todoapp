/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";

import { Todo, isNewTodo } from "../core/data/models/todo.ts";
import createTodo from "../core/data/todo/create-todo.ts";
import listAllTodos from "../core/data/todo/list-todo.ts";
import TodoItem from "../islands/TodoItem.tsx";

type TodosProps = {
  allTodos: Todo[];
};

export const handler: Handlers<TodosProps> = {
  async GET(_req, ctx) {
    const allTodos = await listAllTodos();

    return ctx.render({
      allTodos: allTodos ?? [],
    });
  },
  async POST(req, ctx) {
    const formData = await req.formData();

    const jsonData = Object.fromEntries(formData);
    if (isNewTodo(jsonData)) {
      await createTodo({
        ...jsonData,
        done: false,
      });
    }
    const allTodos = await listAllTodos();

    return ctx.render({
      allTodos: allTodos ?? [],
    });
  },
};

export default function Todos(props: PageProps<TodosProps>) {
  const { data } = props;
  const { allTodos } = data;

  return (
    <div
      className={tw`h-100 w-full flex flex-col items-center justify-center bg-teal-lightest font-sans`}
    >
      <div
        className={tw`bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg`}
      >
        <h2>Todo Items - Items uses the API endpoints to update data.</h2>
        <hr className={tw`mb-1`} />
        {allTodos.map((todo) => (
          <TodoItem value={todo} />
        ))}
      </div>
      <hr />
      <div
        className={tw`bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg`}
      >
        <h2>
          Create a new todo: this approach uses a SUBMIT action against the same
          page.
        </h2>
        <form method="POST" className={tw`flex flex-col font-sans`}>
          <input />
          <div className={tw`mb-4`}>
            <label
              className={tw`block text-gray-700 text-sm font-bold mb-2`}
              for="todo-name"
            >
              Name
            </label>
            <input
              className={tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="todo-name"
              type="text"
              name="name"
            />
          </div>
          <button
            className={tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
          >
            Add todo
          </button>
        </form>
      </div>
    </div>
  );
}
