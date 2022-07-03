import { MongoClient } from "mongo";
import appEnv from "../app-env.ts";

const { MONGODB_URI } = appEnv;

const client = new MongoClient();

if (!MONGODB_URI) {
  console.error(`MONGODB Uri missing. Exiting.`);
  Deno.exit(1);
}

await client.connect(MONGODB_URI);
const database = client.database("TODO_APP");

export default database;
