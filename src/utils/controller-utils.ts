import { ZodError } from "zod";
import { Context } from "koa";

export function handleZodError(ctx: Context, error: ZodError) {
  const messages = error.issues.map((issue) => {
    return `${issue.path.join(".")} ${issue.message}`;
  });

  ctx.status = 400;
  ctx.body = { error: messages };
}
