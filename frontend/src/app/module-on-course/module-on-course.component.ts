import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-on-course',
  templateUrl: './module-on-course.component.html',
  styleUrls: ['./module-on-course.component.css']
})
export class ModuleOnCourseComponent implements OnInit {

  @Input() name: string = "";
  @Input() id: number = 0;
  @Input() author: string = "";

  constructor() { }

  ngOnInit(): void {}


}
