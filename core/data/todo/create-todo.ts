import { Collections } from "../collections.ts";

import { Todo, NewTodo } from "../models/todo.ts";
import client from "../mongo-client.ts";

export default function createTodo(todo: NewTodo) {
  return client.collection<Todo>(Collections.TODOS).insertOne(todo);
}
