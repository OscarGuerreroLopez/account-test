import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { FindAllAccountsService } from "../../../account";

export const FindAllAccounts: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request.user;

    const result = await FindAllAccountsService(userId);

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

    return response.status(500).send({
      message: "Register issue, check logs"
    });
  }
};
