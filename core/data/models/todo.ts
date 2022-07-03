import { ObjectId } from "mongo";

export interface Todo {
  _id: ObjectId;
  name: string;
  done: boolean;
}

export type NewTodo = Omit<Todo, "_id">;

export function isNewTodo(item: any): item is NewTodo {
  return Boolean(item?.name) && !item._id;
}
