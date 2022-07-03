import { ObjectId } from "mongo";

import { Collections } from "../collections.ts";
import { Todo } from "../models/todo.ts";
import client from "../mongo-client.ts";
import getTodo from "./get-todo.ts";

export default async function toggleTodoDone(todoId: string) {
  const collection = client.collection<Todo>(Collections.TODOS);
  const todoDoc = await getTodo(todoId);

  if (!todoDoc) {
    throw new Error(`Record with id ${todoId} was not found.`);
  }

  return collection.updateOne(
    {
      _id: new ObjectId(todoId),
    },
    {
      $set: {
        ...todoDoc,
        done: !todoDoc.done,
      },
    }
  );
}
