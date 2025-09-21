import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './user';
import { Event } from './event';

@Entity()
@Unique(['user', 'event'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user!: User;

  @ManyToOne(() => Event, (event) => event.bookings)
  event!: Event;
}
