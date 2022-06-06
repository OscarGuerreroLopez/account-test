export * from "./error.middleware";
export * from "./logger";
export * from "./notFound.middleware";
export * from "./validator.middleware";
export * from "./authAdmin";
// export * from "./authUser";

import { AuthCommon } from "./authCommon";
import { VerifyToken } from "../../utils";
import { FindUserByUserId } from "../../user";
import { MakeAuthUserMiddleware } from "./authUser";
import { MakeAuthAdminMiddleware } from "./authAdmin";

const authCommon = AuthCommon(VerifyToken, FindUserByUserId);
export const UserAuthMiddleware = MakeAuthUserMiddleware(authCommon);
export const AdminAuthMiddleware = MakeAuthAdminMiddleware(authCommon);
