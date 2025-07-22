import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models/Cidade";
import { CidadesProvider } from "../../database/providers/cidades";
import { z } from "zod";

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string().min(3).max(150),
  })),
}));

export const create: RequestHandler = async (req, res) => {
  const result = await CidadesProvider.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
};
