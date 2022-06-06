export * from "./validateEnv";
export * from "./logger";
export * from "./bodySanitation";
export * from "./errorHandler";
export * from "./validatePassword";
export * from "./validateEmail";
export * from "./password";
export * from "./jwt";
export * from "./nanoUUID";
export * from "./transactionUtil";

import { BuildMakeVerifyJwt } from "./jwt";

const buildJwt = BuildMakeVerifyJwt.getInstance();
export const MakeToken = buildJwt.makeToken;
export const VerifyToken = buildJwt.verifyToken;
