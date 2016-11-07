import { Injectable } from '@angular/core';

<<<<<<< HEAD
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

=======
@Injectable()
export class ClassService {

  constructor() { }

>>>>>>> 606b34f... Add a class service
}
