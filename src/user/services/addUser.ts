import { MakeUser, User } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { AddUser, MakePassword } from "./interfaces";

export const MakeAddUser = (
  repo: DbMethodsType,
  makePassword: MakePassword
): AddUser => {
  const addUser = async (user: User) => {
    const validUser = MakeUser(user);

    const hashPassword = await makePassword(validUser.getPassword());

    const result = await repo("users").insert<User>({
      name: validUser.getName(),
      password: hashPassword,
      email: validUser.getEmail(),
      role: "User",
      userId: validUser.getUserId()
    });

    if (!result) {
      throw new Error("Not able to insert user");
    }

    return true;
  };

  return addUser;
};
