import { User } from "./user.module";

class UsersDb {
  users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  removeUserById(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export const userDb = new UsersDb();
