import { UserRepository } from '../repositories/user.repository';
import { EventRepository } from '../repositories/event.repository';
import { BookingRepository } from '../repositories/booking.repository';
import { EventNotFoundException } from '../exceptions/EventNotFoundException';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { InsufficientCapacityException } from '../exceptions/InsufficientCapacityException';
import { DuplicateBookingException } from '../exceptions/DuplicateBookingException';
import { EntityToDtoMapper } from '../util/mapper';
import { BookingResponseDto } from '../dto/booking-response.dto';

export class BookingService {
  constructor(
    private userRepo: UserRepository,
    private eventRepo: EventRepository,
    private bookingRepo: BookingRepository
  ) {}

  async create(eventId: string, userId: string): Promise<BookingResponseDto> {
    const event = await this.eventRepo.findById(eventId);
    if (!event) throw new EventNotFoundException(eventId);

    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundException(userId);

    if (event.bookedSeats >= event.capacity) {
      throw new InsufficientCapacityException(event.title);
    }

    const existing = await this.bookingRepo.findByUserAndEvent(userId, eventId);
    if (existing) throw new DuplicateBookingException(user.email);

    const booking = await this.bookingRepo.create(user, event);
    await this.eventRepo.updateBookedSeats(eventId, event.bookedSeats + 1);

    return EntityToDtoMapper.toBookingDto(booking);
  }
}
