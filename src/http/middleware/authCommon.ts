import { FindUserByUserIdType } from "../../user/services";
import { VerifyTokenType } from "../../utils";

export type AuthCommonType = (
  token?: string,
  userAgent?: string | undefined,
  clientIp?: string | undefined
) => Promise<RequestUser>;

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

    const decoded = verifyToken(token);

    const user = await findUserByUserId(decoded.id);

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
