import { Request, Response, NextFunction } from "express";
import { BuildMakeVerifyJwt, ErrorHandler, Severity } from "../../utils";
import { FindUserByUserId } from "../../user";

export const UserAuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const code = request.code;

  try {
    const token = request.headers.authorization;

    if (!token) {
      throw Error("missing token");
    }

    const jwtInstance = BuildMakeVerifyJwt.getInstance();

    const decoded = jwtInstance.verifyToken(token);

    const user = await FindUserByUserId(decoded.id);

    if (Object.keys(user).length === 0) {
      throw Error(`User ${decoded.id} does not exist in DB`);
    }

    // in case user role has chnaged since token creation
    if (decoded.role !== user.role) {
      throw Error(
        `user in the token has role ${decoded.role} and in the DB ${user.role} `
      );
    }

    const userAgent = request.headers["user-agent"];
    const clientIp = request.clientIp;

    if (decoded.userAgent !== userAgent || decoded.clientIp !== clientIp) {
      throw Error(`User ${decoded.id} has changed location`);
    }

    request.user = user;

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
