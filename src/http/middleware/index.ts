export * from "./error.middleware";
export * from "./logger";
export * from "./notFound.middleware";
export * from "./validator.middleware";
export * from "./authAdmin";
export * from "./authUser";

import { AuthCommon } from "./authCommon";
import { VerifyToken } from "../../utils";
import { FindUserByUserId } from "../../user";

export const authCommon = AuthCommon(VerifyToken, FindUserByUserId);
