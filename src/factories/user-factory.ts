import { User } from '../entities/user';
import { v4 as uuid } from 'uuid';
import { ValidationException } from '../exceptions/ValidationException';

export class UserFactory {
  private static EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static create(name: string, email: string): User {
    if (!name || name.trim().length === 0) {
      throw new ValidationException('Name is required');
    }

    if (!this.isValidEmail(email)) {
      throw new ValidationException('Invalid email format');
    }

    const user = new User();
    user.id = uuid();
    user.name = name.trim();
    user.email = email.toLowerCase();

    return user;
  }

  private static isValidEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }
}
