import { Injectable } from '@angular/core';

import { Class } from '../classes/shared/class';
import { CLASSES } from '../shared/mock-classes';

@Injectable()
export class CourseService {

  constructor() { }

  getClasses(): Promise<Class[]> {
    return Promise.resolve(CLASSES);
  }

}
