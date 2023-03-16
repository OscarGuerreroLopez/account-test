import bcrypt from "bcryptjs";
import _ from "underscore";

export type MakePassword = (plainPassword: string) => Promise<string>;
export type ComparePassword = (
  password: string,
  hashPassword: string
) => Promise<boolean>;

export type RemovePassword = <T>(
  items: T | T[]
) => IObjectLiteral[] | IObjectLiteral;
export interface MakeComparePassword {
  makePassword: MakePassword;
  comparePassword: ComparePassword;
  removePassword: RemovePassword;
}
export const BuildPassword = (saltRounds: number): MakeComparePassword => {
  const makePassword = async (plainPassword: string): Promise<string> => {
    const result = await bcrypt.hash(plainPassword, saltRounds);

    return result;
  };

  const comparePassword = async (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword);
  };

  const removePassword = <T>(
    items: T[] | T
  ): IObjectLiteral[] | IObjectLiteral => {
    if (Array.isArray(items)) {
      const newArray = _.map(items, (item: T) => _.omit(item, "password"));

      return newArray;
    }

    return _.omit(items, "password");
  };

  return { makePassword, comparePassword, removePassword };
};
