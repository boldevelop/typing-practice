import { Email, Password, User } from "../entities";
import UserService from "./user-service";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: Email, password: Password): Promise<User> {
    const users = await this.userService.getAllUsers();
    return this.userService.getUserByPassAndEmali(users, email, password);
  }
}
