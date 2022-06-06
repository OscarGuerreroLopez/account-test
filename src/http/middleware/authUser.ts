import { Request, Response, NextFunction } from "express";
import { VerifyToken, ErrorHandler, Severity } from "../../utils";
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

    const decoded = VerifyToken(token);

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

    if (!user.name) {
      throw new Error("name missing in user DB");
    }

    if (!user.email) {
      throw new Error("email missing in user DB");
    }

    if (!user.userId) {
      throw new Error("userId missing in user DB");
    }

    request.user = {
      name: user.name,
      email: user.email,
      role: user.role,
      userId: user.userId
    };

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
