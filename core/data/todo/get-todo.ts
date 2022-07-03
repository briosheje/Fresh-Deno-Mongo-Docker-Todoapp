import { Collections } from "../collections.ts";

import { ObjectId } from "mongo";
import { Todo } from "../models/todo.ts";
import client from "../mongo-client.ts";

export default function getTodo(id: string) {
  return client.collection<Todo>(Collections.TODOS).findOne({
    _id: new ObjectId(id),
  });
}
