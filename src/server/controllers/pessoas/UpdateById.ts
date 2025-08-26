import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middlewares';
import { IPessoa } from '../../database/models';
import z from 'zod';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(z.object({
    nome: z.string().min(3).max(150),
    sobrenome: z.string().min(3).max(150),
    email: z.string().email().min(3).max(150),
    cidadeId: z.number().int().positive(),
  })),
  params: get<IParamProps>(z.object({
    id: z.coerce.number().int().positive(),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await PessoasProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};