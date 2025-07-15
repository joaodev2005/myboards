import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { z } from "zod";

interface IQuerryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQuerryProps>(z.object({
    page: z.coerce.number().gt(0).optional(),
    limit: z.coerce.number().gt(0).optional(),
    filter: z.string().optional(),
  })),
}));

export const getAll: RequestHandler = async (req: Request<{}, {}, {}, IQuerryProps>, res: Response) => {

  // console.log("Request body:", req.query);

  // res.status(StatusCodes.OK).json({
  //   message: "Not implemented",
  //   data: req.body,
  // });

  // return;
  res.setHeader('acess-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: 'Cidade Teste',
    }
  ])

  return;
}