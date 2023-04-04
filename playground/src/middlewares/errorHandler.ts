import { Request, Response, NextFunction } from "express";
import { Boom } from "@hapi/boom";

// export function logErrors(
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log(err);
//   next(err);
// }

export function errorHandler(
  err: Error | Boom | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorResponse: { status: number; message: string };

  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    errorResponse = {
      status: +statusCode,
      message: payload.message,
    };
  } else {
    errorResponse = {
      status: 500,
      message: "Error en el servidor",
    };
  }

  res.status(errorResponse.status).json({ message: errorResponse.message });
}
