import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../../utils";
import { AddAccountService } from "../../../account";

export const AddAccount: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const accountPayLoad = {
      userId: request.user.userId,
      currency: request.body.currency
    };
    const result = await AddAccountService(accountPayLoad);

    return response.status(200).send({
      result
    });
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
