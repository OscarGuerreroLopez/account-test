import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity, HttpRequestTimer } from "../../../utils";
import { FindAllUsers } from "../../../user";

export const GetAllUsers: Handler = async (
  request: Request,
  response: Response
) => {
  const { requestRoute, requestMethod } = request;

  const end = HttpRequestTimer.startTimer();

  try {
    const result = await FindAllUsers();

    response.status(200).send({
      result
    });
    end({ route: requestRoute, method: requestMethod, code: 200 });
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

    response.status(500).send({
      message: "Login issue, check logs"
    });
    end({ route: requestRoute, method: requestMethod, code: 500 });
  }
};
