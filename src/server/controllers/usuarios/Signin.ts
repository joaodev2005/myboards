import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models/Usuario";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { z } from "zod";
import { JWTService, PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    email: z.string().email().min(5).email(),
    senha: z.string().min(6),
  })),
}));

export const signIn: RequestHandler = async (req, res) => {

  const { email, senha } = req.body;

  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Erro ao buscar usuário',
      },
    });
    return;
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);

  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Erro ao buscar usuário',
      },
    });
    return;
  } else {

    const accessToken = JWTService.sign({ uid: result.id });

    if (accessToken === 'JWT_SECRET not defined') {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar token de acesso',
        },
      });
      return;
    }

    res.status(StatusCodes.OK).json({ accessToken });
    return;
  }
};