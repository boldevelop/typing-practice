import * as t from "runtypes";

export const Credentials = t.Record({ email: t.String, password: t.String });
export type Credentials = t.Static<typeof Credentials>;

export const Email = t
  .Record({ value: t.String })
  .asReadonly()
  .withBrand("Email")
  .withConstraint((email) => email.value.includes("@") || "Not valid Email");
export type Email = t.Static<typeof Email>;

export const Password = t
  .Record({ value: t.String })
  .asReadonly()
  .withBrand("Password")
  .withConstraint((pass) => pass.value.length > 3 || "Too short password");
export type Password = t.Static<typeof Password>;
