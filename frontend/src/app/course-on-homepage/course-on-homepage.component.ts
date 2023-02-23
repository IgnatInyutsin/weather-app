import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-on-homepage',
  templateUrl: './course-on-homepage.component.html',
  styleUrls: ['./course-on-homepage.component.css']
})
export class CourseOnHomepageComponent implements OnInit {
  @Input() name: string = "";
  @Input() id: number = 0;
  @Input() author: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
