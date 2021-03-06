import { mockReq, mockRes } from "sinon-express-mock";
import * as winston from "winston";
import { GetUser } from "./getUser";

// Avoid writing to logs during testing
jest.mock("../../../utils/logger.ts", () => {
  enum Severity {
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
  }
  const Logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });

  return { Logger, Severity };
});

const uuid = "1c32f955-312a-472d-97d9-69c075445e46";

describe("getUser test", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;

  beforeEach(async () => {
    const req = {
      params: {
        email: "user1@oscar.com"
      },
      user: {
        email: "user1@oscar.com",
        name: "User",
        role: "User",
        userId: "AGHxYB"
      },
      code: uuid
    };
    request = mockReq(req);

    response = mockRes({
      send: (data: any) => (body = data),
      status: (data: any) => {
        status = data;
        return response;
      }
    });
  });

  it("Should get a user", async () => {
    const requestResult = {
      name: "User",
      email: "user1@oscar.com",
      role: "User",
      userId: "AGHxYB"
    };
    await GetUser(request, response, next);
    expect(body).toBeDefined();
    expect(body).toEqual(requestResult);
    expect(status).toBe(200);
  });
});
