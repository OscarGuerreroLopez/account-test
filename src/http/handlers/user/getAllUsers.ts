import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { FindAllUsers } from "../../../user";

export const GetAllUsers: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await FindAllUsers();

    return response.status(200).send({
      result
    });
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
