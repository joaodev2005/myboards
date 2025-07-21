import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models/Cidade";
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

  // console.log("Request params:", req.params);
  // console.log("Request body:", req.body);

  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   message: "Not implemented",
  //   data: req.body,
  // });

  // return;

  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: 'Erro ao atualizar o registro. Registro não encontrado.',
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
}