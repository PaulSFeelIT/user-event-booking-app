import express from 'express';
import dotenv from 'dotenv';
import { Database } from './config/database';
import { UserRepository } from './repositories/user.repository';
import { EventRepository } from './repositories/event.repository';
import { BookingRepository } from './repositories/booking.repository';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { BookingService } from './services/booking.service';
import { UserController } from './controllers/user.controller';
import { EventController } from './controllers/event.controller';
import { BookingController } from './controllers/booking.controller';

async function bootstrap() {
  dotenv.config();
  // tslint:disable-next-line
  await Database.getInstance().init();

  const userRepo = new UserRepository();
  const eventRepo = new EventRepository();
  const bookingRepo = new BookingRepository();

  const userService = new UserService(userRepo);
  const eventService = new EventService(eventRepo);
  const bookingService = new BookingService(userRepo, eventRepo, bookingRepo);

  const userController = new UserController(userService);
  const eventController = new EventController(eventService);
  const bookingController = new BookingController(bookingService);

  const app = express();
  app.use(express.json());

  app.use('/users', userController.router);
  app.use('/events', eventController.router);
  app.use('/events', bookingController.router);

  const port = process.env.PORT ?? 8000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

bootstrap();
