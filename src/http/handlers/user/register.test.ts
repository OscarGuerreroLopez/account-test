import { mockReq, mockRes } from "sinon-express-mock";
import * as winston from "winston";
import { Register } from "./register";
import { FindUserByEMail } from "../../../user/services";

import { LoadMethods, TestConnection } from "../../../infra/repo";

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

describe("Register handler", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;

  beforeAll(async () => {
    await LoadMethods();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  beforeEach(async () => {
    const req = {
      body: {
        name: "Oscar",
        password: "Abc123",
        email: "oscar@gmail.com"
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

  it("Should get a true result", async () => {
    const result = await FindUserByEMail("oscar@gmail.com");
    expect(result).toStrictEqual({});
    await Register(request, response, next);
    expect(body).toBeDefined();
    expect(body).toEqual({
      result: true
    });
    expect(status).toBe(200);
  });

  it("should user be created correctly and in the DB", async () => {
    const result = await FindUserByEMail("oscar@gmail.com");

    expect(result).toBeTruthy();
    expect(result.name).toStrictEqual("Oscar");
    expect(result.email).toStrictEqual("oscar@gmail.com");
  });
});
