import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity, Prometheus } from "../../utils";

export const Metrics: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    response.setHeader("Content-Type", Prometheus.contentType);
    return response.send(await Prometheus.metrics());
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "metrics handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(500).send({
      message: "metrics route not working, check logs"
    });
  }
};
