import { FindUserByUserIdType } from "../../user/services";
import { VerifyTokenType, APM } from "../../utils";

export type AuthCommonType = (
  token?: string,
  userAgent?: string | undefined,
  clientIp?: string | undefined
) => Promise<RequestUser>;

const apm = APM.getApm();

export const AuthCommon = (
  verifyToken: VerifyTokenType,
  findUserByUserId: FindUserByUserIdType
): AuthCommonType => {
  return async (
    token?: string,
    userAgent?: string,
    clientIp?: string
  ): Promise<RequestUser> => {
    if (!token) {
      throw Error("missing token");
    }
    if (!userAgent) {
      throw Error("missing user agent");
    }

    if (!clientIp) {
      throw Error("missing client ip");
    }

    apm.startTransaction("verifyToken", { startTime: Date.now() });
    const decoded = verifyToken(token);
    apm.endTransaction("success verifyToken", Date.now());

    apm.startTransaction("findCurrentUser", { startTime: Date.now() });
    const user = await findUserByUserId(decoded.id);
    apm.endTransaction("success findCurrentUser", Date.now());

    if (Object.keys(user).length === 0) {
      throw Error(`User ${decoded.id} does not exist in DB`);
    }

    // in case user role has chnaged since token creation
    if (decoded.role !== user.role) {
      throw Error(
        `user in the token has role ${decoded.role} and in the DB ${user.role} `
      );
    }

    if (decoded.userAgent !== userAgent || decoded.clientIp !== clientIp) {
      throw Error(`User ${decoded.id} has changed location`);
    }

    if (!user.name) {
      throw new Error("name missing in user DB");
    }

    if (!user.email) {
      throw new Error("email missing in user DB");
    }

    if (!user.userId) {
      throw new Error("userId missing in user DB");
    }

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      userId: user.userId
    };
  };
};
