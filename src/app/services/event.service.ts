import { Injectable } from '@angular/core';

import { Event } from '../events/shared/event';
import { EVENTS } from '../shared/mock-events';

@Injectable()
export class EventService {
  events: Event[] = [];
  event: Event;

  constructor() { }

/**
 * Get events.
 * 
 * @returns {Promise<Event[]>}
 * 
 * @memberOf EventService
 */
  getEvents(): Promise<Event[]> {
    return Promise.resolve(EVENTS);
  }

/**
 * 
 * 
 * @param {String} id
 * @returns {Promise<Event>}
 * 
 * @memberOf EventService
 */
  getEvent(id: string): Promise<Event> {
    return this.getEvents().then(events => events.find(event => event.id === id));
  }

}
