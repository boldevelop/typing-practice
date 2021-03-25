
import * as t from "runtypes";
import { Admin } from "./admin";
import { Client } from "./client";
import { Moderator } from "./moderator";

export const User = t.Union(Admin, Client, Moderator);
export type User = t.Static<typeof User>

export type LoggedUser = Admin | Client |  Moderator;
export type PrivilegedUser = Admin | Moderator;

export function isPrivilegedUser(user: LoggedUser): user is PrivilegedUser {
    return Admin.is(user) || Moderator.is(user);
}


