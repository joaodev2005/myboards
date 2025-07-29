import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models/Cidade";
import { CidadesProvider } from "../../database/providers/cidades";
import { z } from "zod";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string().min(3),
  })),
  params: getSchema<IParamProps>(z.object({
    id: z.coerce.number().gt(0).int().positive(),
  })),
}));

export const updateById = async (req:  Request<IParamProps, {}, IBodyProps>, res: Response) => {

  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'ID do registro não informado.',
      },
    });
  }

  const result = await CidadesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
  
}