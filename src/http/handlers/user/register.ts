import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { AddUser } from "../../../user";

export const Register: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await AddUser(request.body);

    return response.status(200).send({
      result
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "Register handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(500).send({
      message: "Register issue, check logs"
    });
  }
};
