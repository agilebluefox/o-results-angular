import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Cls } from '../shared/cls.model';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent implements OnInit {

  classAddForm: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.classAddForm = new FormGroup({
      year: new FormControl(null, Validators.required),
      semester: new FormControl(null, Validators.required),
      prefix: new FormControl('HESO', Validators.required),
      number: new FormControl('253', Validators.required),
      name: new FormControl('Orienteering', Validators.required),
      section: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.classAddForm.value);
    this.classService.addClass(this.classAddForm.value)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      // Use state map to reset the values in the form field
      this.classAddForm.reset({
        prefix: 'HESO',
        number: '253',
        name: 'Orienteering'
      });
  }

  goBack(link) {
    this.location.back();
  }


}
