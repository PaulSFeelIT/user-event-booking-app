import { BaseException } from "./BaseException";

export class DuplicateBookingException extends BaseException {
  constructor(email: string) {
    super(`User with email ${email} has already booked a seat in this event`, 'DUPLICATE_BOOKING');
  }
}