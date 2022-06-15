import { v4 as uuid } from "uuid";

export class User {
  readonly id: string;

  constructor(
    public username: string,
    public age: number,
    public hobbies: string[]
  ) {
    this.id = uuid();
  }

  static isValid(userObj: Partial<User>): userObj is User {
    return (
      typeof userObj.username === "string" &&
      typeof userObj.age === "number" &&
      Array.isArray(userObj.hobbies)
    );
  }
}
