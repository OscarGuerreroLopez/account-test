import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";

export const GetUser: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const user = request.user;

    return response.status(200).send(user);
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "GetUser handler",
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
