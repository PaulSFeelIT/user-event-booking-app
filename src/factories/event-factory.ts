import { Event } from '../entities/event';
import { v4 as uuid } from 'uuid';
import { ValidationException } from '../exceptions/ValidationException';

export class EventFactory {
  static create(title: string, date: Date, capacity: number): Event {
    if (!title || title.trim().length === 0) {
      throw new ValidationException('Title is required');
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new ValidationException('Invalid date');
    }

    if (capacity <= 0) {
      throw new ValidationException('Capacity must be greater than zero');
    }

    const event = new Event();
    event.id = uuid();
    event.title = title.trim();
    event.date = date;
    event.capacity = capacity;
    event.bookings = [];

    return event;
  }
}
