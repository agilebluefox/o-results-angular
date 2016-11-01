import { Injectable } from '@angular/core';

import { Event } from '../events/shared/event';
import { EVENTS } from '../shared/mock-events';

@Injectable()
export class EventService {

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
 * Retrieve an event object using an id.
 * 
 * @param {any} id
 * 
 * @memberOf EventService
 */
  getEventById(id) {
    this.getEvents().then(events => events.find(event => event.id === id));
  }

}
