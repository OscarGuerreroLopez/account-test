import { nanoid } from "nanoid";

export const NanoUUID = (): string => {
  return nanoid(6);
};
