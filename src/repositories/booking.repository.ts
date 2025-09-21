import { Repository } from 'typeorm';
import { Booking } from '../entities/booking';
import { User } from '../entities/user';
import { Event } from '../entities/event';
import { Database } from '../config/database';

export class BookingRepository {
  private repo: Repository<Booking>;

  constructor() {
    const db = Database.getInstance().getDataSource();
    this.repo = db.getRepository(Booking);
  }

  async create(user: User, event: Event): Promise<Booking> {
    const booking = this.repo.create({ user, event });
    return this.repo.save(booking);
  }

  async findByUserAndEvent(
    userId: string,
    eventId: string
  ): Promise<Booking | null> {
    return this.repo.findOne({
      where: { user: { id: userId }, event: { id: eventId } },
    });
  }
}
