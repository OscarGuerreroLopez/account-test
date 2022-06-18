import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

import { ErrorHandler, Severity } from "../../utils";

export const LoggerMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  try {
    request.requestRoute = request.path;
    request.requestMethod = request.method;
    request.code = uuidv4();

    ErrorHandler({
      error: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      additionalErrorInfo: {
        severity: Severity.INFO,
        identifier: "LoggerMiddleware",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    next();
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "LoggerMiddleware",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    next();
  }
};
