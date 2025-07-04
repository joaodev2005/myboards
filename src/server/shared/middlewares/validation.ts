import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

type TProperty     = "body" | "query" | "params" | "headers";
type TAllSchemas   = Record<TProperty, z.ZodTypeAny>;
type TGetSchemas   = <T>(schema: z.ZodType<T>) => z.ZodType<T>;
type TGetAllSchemas= (getSchema: TGetSchemas) => Partial<TAllSchemas>;
type TValidation   = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => {

  const Schemas = getAllSchemas((schema) => schema);

  const middleware: RequestHandler = async (req, res, next) => {
    const errorsResult: Record<string, Record<string, string>> = {};

    for (const key of Object.keys(Schemas) as TProperty[]) {
      const schema = Schemas[key];
      if (!schema) continue;

      try {
        const validatedData = await schema.parseAsync(req[key]);
        res.locals[key] = validatedData;
      } catch (err) {
        const zodError = err as z.ZodError;
        const fieldErrors: Record<string, string> = {};
        zodError.issues.forEach(issue => {
          fieldErrors[issue.path.join(".")] = issue.message;
        });
        errorsResult[key] = fieldErrors;
      }
    }

    if (Object.keys(errorsResult).length) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation failed",
        errors: errorsResult,
      });
      return;
    }

    next();
  };

  return middleware;
};



