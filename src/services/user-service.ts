import {
  User,
  Role,
  Admin,
  Client,
  Moderator,
  Email,
  Password,
} from "../entities";
import { castTo, RoleToUser } from "../entities/role-to-user";
import {
  AVAILABLE_OPERATIONS,
  AVAILABLE_OPERATIONS_T,
} from "../entities/available-operations";

// через контракт
// const getUserByPassAndEmali = Contract(
//   Array(User).asReadonly(),
//   Email,
//   Password,
//   User
// ).enforce((users, email, password) => {
//   for (let u of users) {
//     if (u.email === email.value && u.password === password.value) {
//       return u;
//     }
//   }

//   throw new Error("Password or email is incorrect");
// });

export default class UserService {
  private users: readonly User[] = [];

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  async updateUserRole<R extends Role>(user: RoleToUser[R], newRole: R) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getUserByPassAndEmali(
    users: readonly User[],
    email: Email,
    password: Password
  ): User {
    for (let u of users) {
      if (u.email === email.value && u.password === password.value) {
        return u;
      }
    }

    throw new Error("Password or email is incorrect");
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }

  getAvailableOperations<U1 extends User, U2 extends User>(
    user: U1,
    currentUser: U2
  ) {
    return AVAILABLE_OPERATIONS[currentUser.role][
      user.role
    ] as AVAILABLE_OPERATIONS_T[U2["role"]][U1["role"]];
  }
}
