import { Request, Response, Router } from 'express';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventResponseDto } from '../dto/event-response.dto';
import { EventNotFoundException } from '../exceptions/EventNotFoundException';
import { ValidationException } from '../exceptions/ValidationException';

export class EventController {
  public router: Router;

  constructor(private eventService: EventService) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/', this.createEvent.bind(this));
    this.router.get('/:eventId', this.getEvent.bind(this));
    this.router.get('/', this.getAllEvents.bind(this));
  }

  async createEvent(req: Request, res: Response) {
    const dto: CreateEventDto = req.body;

    try {
      const event = await this.eventService.create(dto.title, dto.date, dto.capacity);

      res.status(201).json(event);
    } catch (err) {
      if (err instanceof ValidationException) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEvent(req: Request, res: Response) {
    const { eventId } = req.params;

    try {
      const event = await this.eventService.getById(eventId);
      if (!event) throw new EventNotFoundException(eventId);

      res.json(event);
    } catch (err) {
      if (err instanceof EventNotFoundException) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAllEvents(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const events = await this.eventService.getAll(page, limit);
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
