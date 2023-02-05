import { mockReq, mockRes } from "sinon-express-mock";
import * as winston from "winston";
import { GetAllUsers } from "./getAllUsers";
import { AddUsers, LoadMethods, TestConnection } from "../../../infra/repo";

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

describe("getAll User test", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;

  beforeAll(async () => {
    await LoadMethods();
    await AddUsers();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

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

  it("Should get all users", async () => {
    const requestResult = [
      {
        name: "User",
        email: "user1@oscar.com",
        role: "User",
        userId: "AGHxYB"
      },
      {
        name: "User",
        email: "user2@oscar.com",
        role: "User",
        userId: "gbH_us"
      }
    ];
    await GetAllUsers(request, response, next);

    const result = body.result;
    const filteredResult = result.map(({ _id, ...rest }: any) => {
      console.log("@@@all users test deleting id", _id);
      return rest;
    });

    expect(body).toBeDefined();
    expect(filteredResult).toEqual(requestResult);
    expect(status).toBe(200);
  });
});
