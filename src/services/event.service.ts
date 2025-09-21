import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event';
import { EventFactory } from '../factories/event-factory';
import { EventResponseDto } from '../dto/event-response.dto';
import { EntityToDtoMapper } from '../util/mapper';
import { EventNotFoundException } from '../exceptions/EventNotFoundException';

export class EventService {
  constructor(private eventRepo: EventRepository) {
  }

  async create(title: string, date: string, capacity: number): Promise<EventResponseDto> {
    const eventToSave = EventFactory.create(title, new Date(date), capacity);
    const event = await this.eventRepo.create(eventToSave.title, eventToSave.date, eventToSave.capacity);

    return EntityToDtoMapper.toEventDto(event);
  }

  async getById(id: string): Promise<EventResponseDto> {
    const event = await this.eventRepo.findById(id);
    if (!event) throw new EventNotFoundException(id);

    return EntityToDtoMapper.toEventDto(event);
  }

  async getAll(page = 1, limit = 10): Promise<EventResponseDto[]> {
    const events = await this.eventRepo.findAll(page, limit);
    return events.map(EntityToDtoMapper.toEventDto);
  }
}
