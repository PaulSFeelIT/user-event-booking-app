import { Request, Response, Router } from 'express';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingResponseDto } from '../dto/booking-response.dto';
import { EventNotFoundException } from '../exceptions/EventNotFoundException';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { InsufficientCapacityException } from '../exceptions/InsufficientCapacityException';
import { DuplicateBookingException } from '../exceptions/DuplicateBookingException';

export class BookingController {
  public router: Router;

  constructor(private bookingService: BookingService) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/:eventId/book', this.bookSeat.bind(this));
  }

  async bookSeat(req: Request, res: Response) {
    const { eventId } = req.params;
    const dto: CreateBookingDto = req.body;

    try {
      const booking = await this.bookingService.create(eventId, dto.userId);

      res.status(201).json(booking);
    } catch (err) {
      if (
        err instanceof EventNotFoundException ||
        err instanceof UserNotFoundException
      ) {
        return res.status(404).json({ message: err.message });
      }
      if (
        err instanceof InsufficientCapacityException ||
        err instanceof DuplicateBookingException
      ) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
