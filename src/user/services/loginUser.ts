import { User } from "../entities";

import { LoginUser, LoginUserParams, MakeLoginUserParams } from "./interfaces";

export const MakeLoginUser = ({
  repo,
  comparePassword,
  makeToken
}: MakeLoginUserParams): LoginUser => {
  const loginUser = async ({
    email,
    password,
    userAgent,
    clientIp
  }: LoginUserParams) => {
    if (!email || !password || !userAgent || !clientIp) {
      throw Error("User params not supplied");
    }

    const userExists = await repo("users").find<User>({
      email
    });

    if (Object.keys(userExists).length !== 1) {
      throw Error(
        `User with email ${email} does not exists or there are many matches`
      );
    }

    const user = userExists[0];

    if (!user.userId) {
      throw Error(`Missing id for the user ${user.email}`);
    }

    const result = await comparePassword(password, user.password);

    if (!result) {
      throw Error(`User with email ${email} wrong password`);
    }

    const token = makeToken({
      id: user.userId,
      role: user.role,
      userAgent,
      clientIp
    });
    return token;
  };

  return loginUser;
};
