import { RequestHandler} from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models/Usuario";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { z } from "zod";

interface IBodyProps extends Omit<IUsuario, 'id'> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string().min(3),
    email: z.string().email().min(5).email(),
    senha: z.string().min(6),
  })),
}));

export const signUp: RequestHandler = async (req, res) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
};
