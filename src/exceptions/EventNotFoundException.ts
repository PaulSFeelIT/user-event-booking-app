import { BaseException } from './BaseException';

export class EventNotFoundException extends BaseException {
  constructor(eventId: string) {
    super(`Event not found: ${eventId}`, 'EVENT_NOT_FOUND');
  }
}
