import { mockReq, mockRes } from "sinon-express-mock";
import * as winston from "winston";
import { MakeAuthUserMiddleware } from "./authUser";
import { LoadMethods, TestConnection, AddUsers } from "../../infra/repo";
import { BuildMakeVerifyJwt, VerifyToken } from "../../utils";
import { AuthCommon } from "./authCommon";
import { FindUserByUserId } from "../../user";

// Avoid writing to logs during testing
jest.mock("../../utils/logger.ts", () => {
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
const buildJwt = BuildMakeVerifyJwt.getInstance();
const makeToken = buildJwt.makeToken;
const goodToken = makeToken({
  id: "AGHxYB",
  role: "User",
  userAgent: "fake userAgent",
  clientIp: "123.11.22.33"
});

const badToken = makeToken({
  id: "AAaaa1234",
  role: "User",
  userAgent: "fake userAgent",
  clientIp: "123.11.22.33"
});

const authCommon = AuthCommon(VerifyToken, FindUserByUserId);
const UserAuthMiddleware = MakeAuthUserMiddleware(authCommon);

describe("Auth user middleware tests", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let status: any;

  beforeAll(async () => {
    await LoadMethods();
    await AddUsers();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  beforeEach(async () => {
    response = mockRes({
      status: (data: any) => {
        status = data;
        return response;
      }
    });
  });
  it("should get the right user in the request.user", async () => {
    const req = {
      headers: {
        authorization: goodToken,
        ["user-agent"]: "fake userAgent"
      },
      code: uuid,
      clientIp: "123.11.22.33"
    };
    request = mockReq(req);

    const requestResult = {
      name: "User",
      email: "user1@oscar.com",
      role: "User",
      userId: "AGHxYB"
    };
    await UserAuthMiddleware(request, response, next);

    expect(request.user).toStrictEqual(requestResult);
  });

  it("should fail if user not found", async () => {
    const req = {
      headers: {
        authorization: badToken
      },
      code: uuid
    };
    request = mockReq(req);

    await UserAuthMiddleware(request, response, next);

    expect(status).toBe(401);
  });

  it("should fail if no token", async () => {
    const req = {
      code: uuid
    };
    request = mockReq(req);

    await UserAuthMiddleware(request, response, next);

    expect(status).toBe(401);
  });
});
