import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  cityName: any = "Самара";
  weatherData: any = {results: [{id: 0, general_recomendation: 0.3, day: "", city: "", temperature: 0, humidity: 0,
    pressure: 0, }]};
  clothes = {0.3: 'Трусы, футболка, шорты, легкие носки, сандалии',
              0.6: 'Мужская одежда: рубашка с короткими рукавами, легкие брюки, легкие носки, обувь.',
              1.0: 'Мужская одежда: Трусы, рубашка, брюки, пиджак, носки, обувью' +
              'Женская одежда: Трусы, чулки, блузка, длинная юбка, пиджак, обувь',
              1.3: 'Нижняя одежда с длинными рукавами и штанинами, рубашка, ' +
              'брюки, свитер, пиджак, носки, обувь',
              1.5: 'Нижняя одежда с короткими рукавами и штанинами, рубашка, ' +
              'брюки, жилет, пиджак, пальто, носки, обувь',
              2.0: 'Нижняя одежда с короткими рукавами и штанинами, ' +
              'рубашка, брюки, пиджак, ',
              2.55: 'Нижняя одежда с длинными рукавами и штанинами, термозащитная куртка и брюки, ' +
              'парка (аляска) с тяжелой подбивкой, штаны с тяжелой подбивкой, носки, обувь, шапка, перчатки'
  }
  errorMessages: any = {
    retypePasswordIncorrect: false,
    emailIncorrect: false,
    emptyPassword: false,
    emptyNickname: false,
    alreadyPlacingEmail: false
  }

  authErrorMessages: any = {
    emptyPassword: false,
    emptyNickname: false,
    incorrectAuth: false
  }

  authorization: any = {
    nickname: "",
    password: ""
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

  userAuthorization(): void {
    this.authErrorMessages.incorrectAuth = false;
    this.authErrorMessages.emptyNickname = false;
    this.authErrorMessages.emptyPassword = false;
    if (this.authorization.nickname == "") {
      this.authErrorMessages.emptyNickname = true;
      return;
    } if (this.authorization.password == "") {
      this.authErrorMessages.emptyPassword = true;
      return;
    }

    this.http.post(this.connector.url + "api/auth/token/login/", {
      username: this.authorization.nickname,
      password: this.authorization.password
    }).subscribe((data: any) => {
      this.cookieService.set("token", data.auth_token)
      location.reload()
    }, (error) => {
      this.authErrorMessages.incorrectAuth = true;
    })
  }

  emailIsValid(email: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
  }
  drawCardPoint(newValue: any): void {
    this.myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
  }

  logout(): void {
    this.http.post(this.connector.url + "api/auth/token/logout/", {},
      {headers: new HttpHeaders({"Authorization": "token " + this.cookieService.get("token")})});
    this.cookieService.delete("token");
    location.reload();
  }

  get(arr:any, index:any): string {
    return arr[index]
  }

  mapClick(): void {
    this.coordinatesNow = this.myPolygon
    console.log(this.myPolygon)
  }
  constructor(private http: HttpClient, private connector: Connector, public cookieService: CookieService) { }
  ngOnInit(): void {
    this.http.get(this.connector.url + "api/weather/?city=" + this.cityName).subscribe((data) => {
      this.weatherData = data;
    }, (error) => {
      console.log(error);
    });
    this.cityName = "";
    if (this.cookieService.get("token") == '') {
      this.http.get(this.connector.url + "api/auth/users/me/", {
        headers: new HttpHeaders({
          "Authorization": "Token " + this.cookieService.get("token")
        })
      }).subscribe(() => {}, this.logout);
    }
  }

  cityWeather(): void {
    this.http.get(this.connector.url + "api/weather/?city=" + this.cityName).subscribe((data) => {
      this.weatherData = data;
    }, (error) => {
      console.log(error);
    });
    this.cityName = "";
  }

}
