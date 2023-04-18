import { Request, Response, NextFunction } from "express";
import { Boom } from "@hapi/boom";
import { BaseError } from "sequelize";

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
  err: Error | Boom | BaseError | any,
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
  } else if (err instanceof BaseError) {
    const _err: any = err;

    if (_err.errors) {
      errorResponse = {
        status: 500,
        message: _err.errors[0].message,
      };
    } else {
      errorResponse = {
        status: 500,
        message: "Server error :c",
      };
    }
  } else {
    console.log(err);
    errorResponse = {
      status: 500,
      message: "Server error :c",
    };
  }

  res.status(errorResponse.status).json({ message: errorResponse.message });
}
