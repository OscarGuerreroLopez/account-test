import { ValidatePassword } from "./validatePassword";

describe("Password validator", () => {
  it("should return true if password is valid", () => {
    const result = ValidatePassword("Abc123");

    expect(result).toBeTruthy();
  });

  it("should return false if password is not valid", () => {
    const result = ValidatePassword("AbcdEfg");

    expect(result).toBeFalsy();
  });
});
