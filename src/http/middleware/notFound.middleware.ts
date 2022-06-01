import { Request, Response } from "express";
import { SanitiseBody, Logger } from "../../utils";

export const NotFoundMiddleware = (
  request: Request,
  response: Response
): Response => {
  const message = `path not found ${request.url}`;

  Logger.warn(message, {
    identifier: "notFoundMiddleware",
    code: request.code,
    body: SanitiseBody(request.body),
    headers: request.headers
  });

  return response.status(404).json({ message: request.code });
};
