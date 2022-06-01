import { UserEntity, BuildMakeUserParams, User, MakeUser } from "./interfaces";

export const BuildMakeUser = (buildMakeUser: BuildMakeUserParams): MakeUser => {
  const makeUser = (user: User): Readonly<UserEntity> => {
    const { ValidateEmail, ValidatePassword, NanoUUID } = buildMakeUser;

    if (!user.name || !user.email || !user.password) {
      throw new Error("Missing user params");
    }

    const isValidEmail = ValidateEmail(user.email);
    const isValidPassword = ValidatePassword(user.password);

    if (!isValidEmail) {
      throw new Error("Invalid email");
    }

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    if (!user.userId) {
      user.userId = NanoUUID();
    }

    return Object.freeze({
      getName: () => user.name,
      getEmail: () => user.email,
      getPassword: () => user.password,
      getId: () => user._id || "",
      getRole: () => user.role,
      getUserId: () => user.userId
    });
  };

  return makeUser;
};
