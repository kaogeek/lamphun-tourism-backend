import z from "zod";

export const toNumberWith = (schema: z.ZodNumber) =>
  z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? val : num;
  }, schema);
  