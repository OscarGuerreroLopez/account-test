import { Request, Response, NextFunction } from "express";
import { ErrorHandler, Severity } from "../../utils";
import { AuthCommonType } from "./authCommon";

export const MakeAuthUserMiddleware = (
  authCommon: AuthCommonType
): ((
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>) => {
  const userAuthMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const code = request.code;

    try {
      const token = request.headers.authorization;
      const userAgent = request.headers["user-agent"];
      const clientIp = request.clientIp;

      request.user = await authCommon(token, userAgent, clientIp);

      next();
    } catch (error) {
      ErrorHandler({
        error,
        additionalErrorInfo: {
          severity: Severity.WARN,
          identifier: "Auth Middleware",
          code: request.code,
          body: request.body,
          headers: request.headers
        }
      });
      response.status(401).send({ message: "Not Authorized", code });
    }
  };

  return userAuthMiddleware;
};
