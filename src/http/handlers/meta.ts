import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity, HttpRequestTimer } from "../../utils";

import { TestConnection } from "../../infra/repo";

export const Meta: Handler = async (request: Request, response: Response) => {
  const end = HttpRequestTimer.startTimer();
  const { requestRoute, requestMethod } = request;
  try {
    const dbConnection = await TestConnection.checkConnection();

    response.status(200).send({
      message: "I am alive",
      dbConnection
    });
    end({ route: requestRoute, method: requestMethod, code: 200 });
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

    response.status(500).send({
      message: "Health route not working, check logs"
    });
    end({ route: requestRoute, method: requestMethod, code: 500 });
  }
};
