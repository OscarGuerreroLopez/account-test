import { Logger, SanitiseBody, SeverityType } from ".";

export interface AdditionalErrorInfo {
  severity: SeverityType;
  identifier: string;
  code?: string;
  body?: IObjectLiteral;
  headers?: IObjectLiteral;
  url?: string;
}

export interface ErrorHandlerParams {
  error: unknown;
  additionalErrorInfo: AdditionalErrorInfo;
  rest?: IObjectLiteral;
}

export const ErrorHandler = ({
  error,
  additionalErrorInfo,
  rest
}: ErrorHandlerParams): void => {
  let message = "No Message";
  let stack = "No Stack";

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack || "Error with No Stack";
  }

  if (typeof error === "string") {
    message = error;
  }

  Logger[additionalErrorInfo.severity](message, {
    identifier: additionalErrorInfo.identifier,
    code: additionalErrorInfo.code || null,
    body: SanitiseBody(additionalErrorInfo.body || {}),
    headers: additionalErrorInfo.headers || null,
    url: additionalErrorInfo.url || null,
    stack,
    ...rest
  });
};
