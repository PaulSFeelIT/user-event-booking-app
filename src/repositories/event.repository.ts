import { Repository } from 'typeorm';
import { Event } from '../entities/event';
import { Database } from '../config/database';

export class EventRepository {
  private repo: Repository<Event>;

  constructor() {
    const db = Database.getInstance().getDataSource();
    this.repo = db.getRepository(Event);
  }

  async create(title: string, date: Date, capacity: number): Promise<Event> {
    const event = this.repo.create({ title, date, capacity });
    return this.repo.save(event);
  }

  async findById(id: string): Promise<Event | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['bookings'],
    });
  }

  async findAll(page = 1, limit = 10): Promise<Event[]> {
    const skip = (page - 1) * limit;
    return this.repo.find({
        skip,
        take: limit,
        relations: ['bookings'],
        order: { date: 'ASC' },
    });
  }

  async updateBookedSeats(eventId: string, bookedSeats: number): Promise<Event> {
    await this.repo.update(eventId, { bookedSeats });
    const updated = await this.findById(eventId);
    if (!updated) {
      throw new Error(`Event with ID ${eventId} not found while updating booked seats`);
    }
    return updated;
  }
}
