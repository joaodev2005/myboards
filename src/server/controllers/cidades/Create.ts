import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { z } from "zod";

interface ICidade {
  nome: string;
}

const bodyValidation: z.ZodType<ICidade> = z.object({
  nome: z.string().min(3),
  estado: z.string().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.parseAsync(req.body);
  } catch (err) {
    const zodError = err as z.ZodError;
    const errors: Record<string, string> = {};

    zodError.issues.forEach(issue => {
      if (!issue.path) return;

      const path = issue.path.join(".");
      errors[path] = issue.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({errors: errors,});
  }

  console.log("Validated data:", validatedData);

  return res.send("Create city endpoint!");
}