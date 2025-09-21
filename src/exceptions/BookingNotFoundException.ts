import { BaseException } from './BaseException';

export class BookingNotFoundException extends BaseException {
  constructor(bookingId: string) {
    super(`Booking not found: ${bookingId}`, 'BOOKING_NOT_FOUND');
  }
}
