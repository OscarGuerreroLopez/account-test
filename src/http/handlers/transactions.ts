import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../utils";
import { AddUserTransaction as AddUserTransactionService } from "../../account";

export const AddUserTransaction: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await AddUserTransactionService(
      request.body.currency,
      request.user.userId,
      request.body.amount
    );

    return response.status(200).send({
      result
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "AddUserTransaction handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(500).send({
      message: "Transaction issue, check logs"
    });
  }
};
