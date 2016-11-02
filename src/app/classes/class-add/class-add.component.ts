import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(link) {
    this.location.back();
  }


}
