import * as t from "runtypes";

export const Credentials = t.Record({ email: t.String, password: t.String });
export type Credentials = t.Static<typeof Credentials>;
