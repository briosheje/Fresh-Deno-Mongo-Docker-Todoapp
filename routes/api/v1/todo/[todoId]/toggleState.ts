import { Handlers } from "$fresh/server.ts";

import toggleTodoDone from "../../../../../core/data/todo/toggle-todo-done.ts";

export type ToggleStateResponse = {
  modifiedCount: number;
};

export const handler: Handlers<ToggleStateResponse> = {
  async PUT(_req, ctx) {
    const { modifiedCount } = await toggleTodoDone(ctx.params.todoId);

    return new Response(
      JSON.stringify({
        modifiedCount,
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  },
};
