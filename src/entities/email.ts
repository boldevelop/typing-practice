import * as t from "runtypes";

export const Email = t
  .Record({ value: t.String })
  .asReadonly()
  .withBrand("Email")
  .withConstraint((email) => email.value.includes("@") || "Not valid Email");
export type Email = t.Static<typeof Email>;
