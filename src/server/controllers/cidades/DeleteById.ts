import { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';
import { z } from 'zod';

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(z.object({
    id: z.coerce.number().gt(0).int().positive(),
  })),
}));

export const deleteById = async (req:  Request<IParamProps>, res: Response) => {

  // console.log("Request params:", req.params);

  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: 'Erro ao deletar o registro. Registro não encontrado.',
    },
  })

  return res.status(StatusCodes.NO_CONTENT).json();
};