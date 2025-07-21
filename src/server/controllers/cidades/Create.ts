import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models/Cidade";
import { z } from "zod";

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string().min(3),
  })),
}));

export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {

  res.status(StatusCodes.CREATED).json(1);

  return;
}