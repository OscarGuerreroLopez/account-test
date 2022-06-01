import { Request, Response } from "express";
import { SanitiseBody, Logger } from "../../utils";
import HttpException from "../../exceptions/HttpException";

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response
): void => {
  const message = error.message || "Something went wrong";
  const code = request.code;

  Logger.error(message, {
    identifier: "ErrorMiddleware",
    message,
    error,
    code,
    body: SanitiseBody(request.body),
    headers: request.headers
  });

  response.status(500).send({
    message: "Something went wrong, check logs",
    code
  });
};
export default errorMiddleware;
