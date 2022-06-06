import jwt from "jsonwebtoken";
import { EnvVars } from "./";

export type MakeTokenType = (data: TokenPayload) => string;
export type VerifyTokenType = (token: string) => TokenPayload;
export interface MakeJwt {
  makeToken: MakeTokenType;
  verifyToken: VerifyTokenType;
}

export const BuildMakeVerifyJwt = (() => {
  const secret = EnvVars.SECRET;

  let instance: MakeJwt;

  const createInstance = () => {
    const makeToken = (data: TokenPayload) => {
      const token = jwt.sign({ ...data }, secret, { expiresIn: "24d" });

      return token;
    };

    const verifyToken = (token: string): TokenPayload => {
      const decoded = jwt.verify(token, secret);

      return decoded as TokenPayload;
    };

    return { makeToken, verifyToken };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }
  };
})();
