import { Collections } from "../collections.ts";

import { Todo } from "../models/todo.ts";
import client from "../mongo-client.ts";

export default function listAllTodos() {
  return client.collection<Todo>(Collections.TODOS).find().toArray();
}
