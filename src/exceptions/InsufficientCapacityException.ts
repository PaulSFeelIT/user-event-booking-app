import { BaseException } from "./BaseException";

export class InsufficientCapacityException extends BaseException {
  constructor(eventTitle: string) {
    super(
      `Insufficient capacity for event ${eventTitle}`,
      'INSUFFICIENT_CAPACITY'
    );
  }
}