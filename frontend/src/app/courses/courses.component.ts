import { Component, OnInit } from '@angular/core';
import { Connector } from "../../assets/restapi";
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  cources: any = {}
  searchForm: string = ""
  restapi = new Connector()

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.restapi.url + "courses/").subscribe((data: any) => {
      console.log(data);
      this.cources = data.results;
    });
  }

  search () : void {
    window.scrollTo(0, 0);
    // сбор курсов
    this.http.get(this.restapi.url + "courses/", {
      params: {name: this.searchForm}
    }).subscribe((data:any) => {
      data = data.results
      console.log(data)
      this.cources = data;
    });
  }

}
