import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';


import { PessoasProvider } from './../../database/providers/pessoas';
import { validation } from '../../shared/middlewares';
import { IPessoa } from './../../database/models';
import z from 'zod';


interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation(get => ({
  body: get<IBodyProps>(z.object({
    nome: z.string().min(3).max(150),
    sobrenome: z.string().min(3).max(150),
    email: z.string().email().min(3).max(150),
    cidadeId: z.number().int().positive(),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};