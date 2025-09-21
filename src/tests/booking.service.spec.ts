import { BookingService } from '../services/booking.service';
import { UserRepository } from '../repositories/user.repository';
import { EventRepository } from '../repositories/event.repository';
import { BookingRepository } from '../repositories/booking.repository';
import { EventNotFoundException } from '../exceptions/EventNotFoundException';
import { InsufficientCapacityException } from '../exceptions/InsufficientCapacityException';
import { DuplicateBookingException } from '../exceptions/DuplicateBookingException';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { User } from '../entities/user';
import { Event } from '../entities/event';

describe('BookingService', () => {
  let bookingService: BookingService;
  let userRepo: jest.Mocked<UserRepository>;
  let eventRepo: jest.Mocked<EventRepository>;
  let bookingRepo: jest.Mocked<BookingRepository>;

  beforeEach(() => {
    userRepo = { findById: jest.fn() } as any;
    eventRepo = { findById: jest.fn(), updateBookedSeats: jest.fn() } as any;
    bookingRepo = { findByUserAndEvent: jest.fn(), create: jest.fn() } as any;

    bookingService = new BookingService(userRepo, eventRepo, bookingRepo);
  });

  it('should create a booking successfully', async () => {
    const user: User = { id: 'u1', name: 'u1', email: 'test@test.com', bookings: [] };
    const event: Event = { id: 'e1', title: 'Event 1', date: new Date('2000-01-01'), capacity: 100, bookedSeats: 0, bookings: [] };

    userRepo.findById.mockResolvedValue(user);
    eventRepo.findById.mockResolvedValue(event);
    bookingRepo.findByUserAndEvent.mockResolvedValue(null);
    bookingRepo.create.mockResolvedValue({ id: 'b1', user, event });

    const result = await bookingService.create('e1', 'u1');

    expect(result).toHaveProperty('id', 'b1');
    expect(eventRepo.updateBookedSeats).toHaveBeenCalledWith('e1', 1);
  });

  it('should throw EventNotFoundException if event not found', async () => {
    eventRepo.findById.mockResolvedValue(null);
    await expect(bookingService.create('e1', 'u1')).rejects.toThrow(EventNotFoundException);
  });

  it('should throw InsufficientCapacityException if event full', async () => {
    const user: User = { id: 'u1', name: 'u1', email: 'test@test.com', bookings: [] };
    const event: Event = { id: 'e1', title: 'Event 1', date: new Date('2000-01-01'), capacity: 1, bookedSeats: 1, bookings: [] };

    userRepo.findById.mockResolvedValue(user);
    eventRepo.findById.mockResolvedValue(event);

    await expect(bookingService.create('e1', 'u1')).rejects.toThrow(InsufficientCapacityException);
  });

  it('should throw DuplicateBookingException if user already booked', async () => {
    const user: User = { id: 'u1', name: 'u1', email: 'test@test.com', bookings: [] };
    const event: Event = { id: 'e1', title: 'Event 1', date: new Date('2000-01-01'), capacity: 10, bookedSeats: 0, bookings: [] };

    userRepo.findById.mockResolvedValue(user);
    eventRepo.findById.mockResolvedValue(event);
    bookingRepo.findByUserAndEvent.mockResolvedValue({ id: 'b1', user: user, event: event });

    await expect(bookingService.create('e1', 'u1')).rejects.toThrow(DuplicateBookingException);
  });
});