import { BaseException } from './BaseException';

export class ValidationException extends BaseException {
  constructor(
    message: string,
    public readonly code: string = 'VALIDATION_EXCEPTION'
  ) {
    super(message, code);
  }
}
