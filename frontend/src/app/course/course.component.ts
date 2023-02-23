import { Component, OnInit } from '@angular/core';
import { Connector } from "../../assets/restapi";
import {HttpClient, HttpParams} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: any = {
    "name": ""
  }
  modules: any = []
  restapi = new Connector()
  id: any = this.route.snapshot.paramMap.get('courseID')

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get(this.restapi.url + "courses/" + this.id + "/").subscribe((data: any) => {
      this.modules = data.modules
      this.course = data
    })
  }

}
