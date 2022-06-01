export const SanitiseBody = (
  unsanitisedBody: IObjectLiteral
): IObjectLiteral => {
  const body: IObjectLiteral = Object.assign({}, unsanitisedBody);

  const passwordKeys = Object.keys(body).filter((key: string) =>
    key.toLowerCase().includes("password")
  );
  passwordKeys.forEach((passwordKey: string) => {
    if (typeof body[passwordKey] === "string") {
      body[passwordKey] = (body[passwordKey] as string)
        .split("")
        .map(() => "*")
        .join("");
    }
  });
  return body;
};
