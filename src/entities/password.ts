import * as t from "runtypes";

export const Password = t
  .Record({ value: t.String })
  .asReadonly()
  .withBrand("Password")
  .withConstraint((pass) => pass.value.length > 3 || "Too short password");
export type Password = t.Static<typeof Password>;
