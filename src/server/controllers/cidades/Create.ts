import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { z } from "zod";

interface ICidade {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(z.object({
    nome: z.string().min(3),
  })),
}));

export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log("Request body:", req.body);

  res.status(StatusCodes.CREATED).json(1);

  return;
}