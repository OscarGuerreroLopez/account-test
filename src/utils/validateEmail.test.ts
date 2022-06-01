import { ValidateEmail } from "./validateEmail";

describe("Password validator", () => {
  it("should return true if emailis valid", () => {
    const result = ValidateEmail("oscar@oscar.com");

    expect(result).toBeTruthy();
  });

  it("should return false if emailis not valid", () => {
    const result = ValidateEmail("AbcdEfg@gmail");

    expect(result).toBeFalsy();
  });
});
