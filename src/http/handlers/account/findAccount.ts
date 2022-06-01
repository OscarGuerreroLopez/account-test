import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { FindAccount as FindAccountService } from "../../../account";

export const FindAccount: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const currency = request.params.currency;
    const result = await FindAccountService(request.user.userId, currency);

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
