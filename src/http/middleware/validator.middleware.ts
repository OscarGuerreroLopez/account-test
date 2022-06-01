import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler, Severity } from "../../utils";

export const ValidatorMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    let message = "";

    errors.array().map((err) => {
      message += `${err.msg || ""} ,`;
    });

    ErrorHandler({
      error: new Error(message),
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "Validator Middleware",
        code: request.code,
        body: request.body,
        headers: request.headers,
        url: request.url
      }
    });

    return response.status(400).send({
      message: "Wrong params, check logs",
      errorCode: request.code
    });
  }

  next();
};
