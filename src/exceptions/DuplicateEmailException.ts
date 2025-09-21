import { BaseException } from './BaseException';

export class DuplicateEmailException extends BaseException {
  constructor(email: string) {
    super(`User with email ${email} already exists`, 'DUPLICATE_EMAIL');
  }
}
