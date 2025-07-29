import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(z.object({
    id: z.coerce.number().gt(0).int().positive(),
  })),
}));

export const getById = async (req:  Request<IParamProps>, res: Response) => {

  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'ID do registro não informado.',
      },
    });
  }

  const result = await CidadesProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
}