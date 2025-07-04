import { Request, RequestHandler, Response} from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { z } from "zod";

interface ICidade {
  nome: string;
  estado: string;
}

interface IFilter {
  filter?: string;
  //limit?: number;
}

export const createValidation = validation((getSchema) => ({ 
  body: getSchema<ICidade>(z.object({
  nome: z.string().min(3),
  estado: z.string().min(3),
})),
  query: getSchema<IFilter>(z.object({
    filter: z.string().min(3).optional(),
  })),
}));

export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log("Request body:", req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Cidade criada com sucesso",
    data: req.body,
  });

  return;
}