import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { FindAccountService } from "../../../account";

export const FindAccount: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const currency = request.params.currency;

    const { userId } = request.user;

    const result = await FindAccountService(userId, currency);

    return response.status(200).send(result);
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "AddAccount handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(400).send({
      message: "Register issue, check logs"
    });
  }
};
