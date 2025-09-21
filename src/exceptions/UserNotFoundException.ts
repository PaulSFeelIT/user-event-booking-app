import { BaseException } from "./BaseException";

export class UserNotFoundException extends BaseException {
  constructor(identifier: string) {
    super(`User not found: ${identifier}`, 'USER_NOT_FOUND');
  }
}