import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Connector } from "../../assets/restapi";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  restapi = new Connector()
  module = {name: "", tasks: [{title: "", "text": "", "answer": ""}]}
  current = 0
  answerOut: string = ""
  isTrueAnswer: boolean | null = null
  id: any = this.route.snapshot.paramMap.get('moduleID')
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get(this.restapi.url + "modules/" + this.id + "/").subscribe((data: any) => {
      console.log(data);
      this.module = data;
    });
  }

  getTask(n: any): void {
    this.current = n;
    this.isTrueAnswer = null;
  }

  answer(): void {
    if (this.module.tasks[this.current].answer.toString() == this.answerOut) {
      this.isTrueAnswer = true;
    } else {
      this.isTrueAnswer = false;
    }
  }
}
