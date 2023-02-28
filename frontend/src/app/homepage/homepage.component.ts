import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Connector} from "../restapi";
import {catchError} from "rxjs";
import { CookieService } from 'ngx-cookie-service';
declare var ymaps:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public map :any;
  public myPolygon: any;
  stateMonitor: any;
  registrationConfirmation: boolean = false;
  coordinatesNow: any;
  weatherData: any = {
    count: 7,
    next: "",
    previous: "",
    results: [
      {
        "day": "2022-02-28",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-01",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-02",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-03",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-04",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },

    ]
  };

  errorMessages: any = {
    retypePasswordIncorrect: false,
    emailIncorrect: false,
    emptyPassword: false,
    emptyNickname: false,
    alreadyPlacingEmail: false
  }
  registration: any =
    {
      nickname: "",
      password: "",
      email: "",
      retypePassword: "",
    }
  userRegistration(): void {
    this.errorMessages.retypePasswordIncorrect = false;
    this.errorMessages.emailIncorrect = false;
    this.errorMessages.emptyPassword = false;
    this.errorMessages.emptyNickname = false;
    this.errorMessages.alreadyPlacingEmail = false;

    if (this.registration.nickname == "") {
      this.errorMessages.emptyNickname = true;
      return;
    } if (this.registration.password == "" || this.registration.retypePassword == "") {
      this.errorMessages.emptyPassword = true;
      return;
    } if (this.registration.email == "") {
      this.errorMessages.emailIncorrect = true;
      return;
    } if (!this.emailIsValid(this.registration.email)) {
      this.errorMessages.emailIncorrect = true;
      this.registration.email = ""
      return;
    } if (this.registration.password != this.registration.retypePassword) {
      this.errorMessages.retypePasswordIncorrect = true;
      this.registration.password = "";
      this.registration.retypePassword = "";
      return;
    }

    this.http.post(this.connector.url + "api/users/", {
      email: this.registration.email,
      username: this.registration.nickname,
      password: this.registration.password
    }).pipe(catchError(() : any => {
      this.errorMessages.alreadyPlacingEmail = true;
    }));
    this.registrationConfirmation = true;
  }

  emailIsValid(email: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
  }
  drawCardPoint(newValue: any): void {
    this.myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
  }

  mapClick(): void {
    this.coordinatesNow = this.myPolygon
    console.log(this.myPolygon)
  }
  constructor(private http: HttpClient, private connector: Connector, private cookieService: CookieService) { }
  ngOnInit(): void {
    // инициализируем яндекс карты
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [53.2001, 50.15],
        zoom: 12
      });
      // Создаем многоугольник без вершин.
      this.myPolygon = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: "crosshair",
        // Максимально допустимое количество вершин.
        editorMaxPoints: 1,
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Ширина обводки.
        strokeWidth: 5
      });
      this.map.geoObjects.add(this.myPolygon);
      // В режиме добавления новых вершин меняем цвет обводки многоугольника.
      this.stateMonitor = new ymaps.Monitor(this.myPolygon.editor.state);
      this.stateMonitor.add("drawing", this.drawCardPoint);

      // Включаем режим редактирования с возможностью добавления новых вершин.
      this.myPolygon.editor.startDrawing();
    });
  }

}
