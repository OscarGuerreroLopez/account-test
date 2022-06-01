import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../utils";

import { TestConnection } from "../../infra/repo";

export const Meta: Handler = async (request: Request, response: Response) => {
  try {
    const dbConnection = await TestConnection.checkConnection();
    return response.status(200).send({
      message: "I am alive",
      dbConnection
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
      message: "Health route not working, check logs"
    });
  }
};
