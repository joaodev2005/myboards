import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'not authorized',
      },
    });
    return;
  }

  console.log(authorization);

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'not authorized',
      },
    });
    return;
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === 'JWT_SECRET not defined') {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'internal server error',
      },
    });
    return;
  } else if (jwtData === 'Invalid token') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'not authorized',
      },
    });
    return;
  }
  
  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};