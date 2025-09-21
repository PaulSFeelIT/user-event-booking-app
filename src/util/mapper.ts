// utils/entity-to-dto.mapper.ts
import { User } from '../entities/user';
import { Event } from '../entities/event';
import { Booking } from '../entities/booking';
import { UserResponseDto } from '../dto/user-response.dto';
import { EventResponseDto } from '../dto/event-response.dto';
import { BookingResponseDto } from '../dto/booking-response.dto';

export class EntityToDtoMapper {
  static toUserDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static toBookingDto(booking: Booking): BookingResponseDto {
    return {
      id: booking.id,
      userId: booking.user.id,
      eventId: booking.event.id,
    };
  }

  static toEventDto(event: Event): EventResponseDto {
    return {
      id: event.id,
      title: event.title,
      date: event.date.toISOString(),
      capacity: event.capacity,
      bookedSeats: event.bookedSeats,
    };
  }
}
