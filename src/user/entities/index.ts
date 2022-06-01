export * from "./interfaces";
import { BuildMakeUser } from "./user";
import { ValidateEmail, ValidatePassword, NanoUUID } from "../../utils";

export const MakeUser = BuildMakeUser({
  ValidateEmail,
  ValidatePassword,
  NanoUUID
});
