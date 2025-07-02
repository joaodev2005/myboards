import { Request, RequestHandler, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { z } from "zod";

interface ICidade {
  nome: string;
  estado: string;
}

const bodyValidation: z.ZodType<ICidade> = z.object({
  nome: z.string().min(3),
  estado: z.string().min(3),
});

export const createBodyValidator: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = await bodyValidation.parseAsync(req.body);
    req.body = validatedData;

    return next();
  } catch (err) {
    const zodError = err as z.ZodError;
    const errors: Record<string, string> = {};

    zodError.issues.forEach(issue => {
      if (!issue.path) return;

      const path = issue.path.join(".");
      errors[path] = issue.message;
    });

    res.status(StatusCodes.BAD_REQUEST).json({ errors });

    return
  }
};

export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log("Request body:", req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Cidade criada com sucesso",
    data: req.body,
  });

  return;
}