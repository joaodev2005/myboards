import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidades";
import { z } from "zod";

interface IQuerryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQuerryProps>(z.object({
    page: z.coerce.number().gt(0).optional(),
    limit: z.coerce.number().gt(0).optional(),
    id: z.coerce.number().int().optional().default(0),
    filter: z.string().optional(),
  })),
}));

export const getAll: RequestHandler = async (req: Request<{}, {}, {}, IQuerryProps>, res: Response) => {
  const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || "", req.query.id);
  const count = await CidadesProvider.count(req.query.filter);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: result.message });
    return;  
  } else if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: count.message });
    return;
  }

  res.setHeader('access-control-expose-headers', 'X-Total-Count');
  res.setHeader('X-Total-Count', count);

  res.status(StatusCodes.OK).json(result);

  return;
}
