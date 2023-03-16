import { LoadMethods, Database, AddUsers } from "../../infra/repo";
import { AuthCommon } from "./authCommon";
import { VerifyToken, MakeToken } from "../../utils";
import { FindUserByUserId } from "../../user";

const authCommon = AuthCommon(VerifyToken, FindUserByUserId);
describe("authCommonTest", () => {
  beforeAll(async () => {
    await LoadMethods();
    await AddUsers();
  }, 120000);

  afterAll(async () => {
    await Database.closeConnection();
  }, 120000);

  it("Should work and return a user object", async () => {
    const token = MakeToken({
      id: "AGHxYB",
      role: "User",
      userAgent: "hola",
      clientIp: "::1"
    });
    const expectedResult = {
      name: "User",
      email: "user1@oscar.com",
      role: "User",
      userId: "AGHxYB"
    };
    const result = await authCommon(token, "hola", "::1");

    expect(result).toStrictEqual(expectedResult);
  });

  it("Should fail cause user changed location", async () => {
    try {
      const token = MakeToken({
        id: "AGHxYB",
        role: "User",
        userAgent: "hola",
        clientIp: "::1"
      });
      await authCommon(token, "hello", "::2");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("User AGHxYB has changed location");
      }
    }
  });

  it("Should fail if user not in DB", async () => {
    try {
      const token = MakeToken({
        id: "AGHxYX",
        role: "User",
        userAgent: "hola",
        clientIp: "::1"
      });
      await authCommon(token, "hello", "::1");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("User AGHxYX does not exist in DB");
      }
    }
  });

  it("Should fail if user role in token not the same in DB", async () => {
    try {
      const token = MakeToken({
        id: "AGHxYB",
        role: "Admin",
        userAgent: "hola",
        clientIp: "::1"
      });
      await authCommon(token, "hello", "::1");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual(
          "user in the token has role Admin and in the DB User "
        );
      }
    }
  });

  it("Should fail if token is not right", async () => {
    try {
      const badToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNLSkx0MyIsInJvbGUiOiJVc2VyIiwidXNlckFnZW50IjoiaG9sYSIsImNsaWVudElwIjoiOjoxIiwiaWF0IjoxNjU0NDk1NDk0LCJleHAiOjE2NTY1NjkwOTR9.YmkMnUuIIysBhxlbif0N -qpBVlhVMFgt4cCFDIGEVHX";
      await authCommon(badToken, "hello", "::1");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("invalid token");
      }
    }
  });

  it("Should fail if token was manipulated", async () => {
    try {
      const badToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNLSkx0MyIsInJvbGUiOiJVc2VyIiwidXNlckFnZW50IjoiaG9sYSIsImNsaWVudElwIjoiOjoxIiwiaWF0IjoxNjU0NDk1NDk0LCJleHAiOjE2NTY1NjkwOTR9.YmkMnUuIIysBhxlbif0N-qpBVlhVMFgt4cCFDIGEVHX";
      await authCommon(badToken, "hello", "::1");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("invalid signature");
      }
    }
  });
});
