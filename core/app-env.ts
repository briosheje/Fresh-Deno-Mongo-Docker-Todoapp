import { config as dotEnvConfig } from "dotenv";
dotEnvConfig({
  export: true,
});

const appEnv = {
  MONGODB_URI: Deno.env.get("MONGODB_URI"),
};
const everyEnvVariableFilled = Object.values(appEnv).every(
  (v) => v !== null && v !== undefined && v !== "" && !Number.isNaN(v)
);
if (!everyEnvVariableFilled) {
  console.error(
    `Not all env variables are correctly compiled, please check that each env variable has a value.`
  );
  Deno.exit(1);
}

export default appEnv;
