export interface User {
  name: string;
  email: string;
  password: string;
  role: RoleType;
  userId: string;
}

export interface UserEntity {
  getName: () => string;
  getEmail: () => string;
  getPassword: () => string;
  getRole: () => string;
  getUserId: () => string;
}

export interface BuildMakeUserParams {
  ValidateEmail: (email: string) => boolean;
  ValidatePassword: (password: string) => boolean;
  NanoUUID: MakeId;
}

export type MakeUser = (user: User) => Readonly<UserEntity>;

export type RoleType = "User" | "Admin";

export type MakeId = () => string;
