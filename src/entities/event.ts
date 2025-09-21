import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  date!: Date;

  @Column()
  capacity!: number;

  @Column()
  bookedSeats: number = 0;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];
}
