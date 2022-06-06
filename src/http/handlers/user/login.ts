import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { LoginUser } from "../../../user";

export const Login: Handler = async (request: Request, response: Response) => {
  try {
    const params = {
      ...request.body,
      userAgent: request.headers["user-agent"],
      clientIp: request.clientIp
    };

    const token = await LoginUser(params);

    if (!token) {
      throw Error("Error login check logs");
    }

    return response.status(200).send({
      token
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "Login handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(500).send({
      message: "Login issue, check logs"
    });
  }
};
