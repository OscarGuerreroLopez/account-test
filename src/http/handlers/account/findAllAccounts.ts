import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { FindAllAccounts as FindAllAccountsService } from "../../../account";

export const FindAllAccounts: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await FindAllAccountsService(request.user.userId);

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
