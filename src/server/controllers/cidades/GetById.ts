import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

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

  console.log("Request params:", req.params);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Not implemented",
    data: req.body,
  });

  return;
}