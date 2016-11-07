import { Injectable } from '@angular/core';

import { Class } from '../classes/shared/class';
import { CLASSES } from '../shared/mock-classes';

@Injectable()
export class ClassService {
  classes: Class[] = [];
  class: Class;

  constructor() { }

  getClasses(): Promise<Class[]> {
    return Promise.resolve(CLASSES);
  }
<<<<<<< HEAD
  
=======

>>>>>>> 838813c... Setup services for data models
}
