import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { PessoasProvider } from './../../database/providers/pessoas';
import { validation } from '../../shared/middlewares';


interface IParamProps {
  id?: number;
}
export const deleteByIdValidation = validation(get => ({
  params: get<IParamProps>(z.object({
    id: z.coerce.number().gt(0).int().positive(),
  })),
}));
export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await PessoasProvider.deleteById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};