import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity, HttpRequestTimer } from "../../utils";

import { TestConnection } from "../../infra/repo";

export const Meta: Handler = async (request: Request, response: Response) => {
  try {
    const end = HttpRequestTimer.startTimer();
    const route = request.route.path;
    console.log("@@@111", route);

    const dbConnection = await TestConnection.checkConnection();

    response.status(200).send({
      message: "I am alive",
      dbConnection
    });
    end({ route, method: request.method });
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
  }
};
