import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { HttpClientModule }   from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseOnHomepageComponent } from './course-on-homepage/course-on-homepage.component';
import { CourseComponent } from './course/course.component';
import { ModuleOnCourseComponent } from './module-on-course/module-on-course.component';
import { TaskComponent } from './task/task.component';
import { CourseModuleComponent } from './course-module/course-module.component';
import { ModuleFooterComponent } from './module-footer/module-footer.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutMeComponent } from './about-me/about-me.component';

// определение маршрутов
const appRoutes: Routes = [
  {
    path: "",
    component: HomepageComponent // компонент главной страницы
  },
  {
    path: "course/:courseID",
    component: CourseComponent, // Компонент выбора модулей
  },
  {
    path: "module/:moduleID",
    component: TaskComponent, // Компонент модуля, который редиректит на первое задание модуля
  },
  {
    path: "courses",
    component: CoursesComponent, // Компонент модуля, который редиректит на первое задание модуля
  },
  {
    path: "registration",
    component: RegistrationComponent, // Компонент модуля, который редиректит на первое задание модуля
  },
  {
    path: "login",
    component: LoginComponent, // Компонент модуля, который редиректит на первое задание модуля
  },
  {
    path: "about-me",
    component: AboutMeComponent, // Компонент модуля, который редиректит на первое задание модуля
  },
];


@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    CourseOnHomepageComponent,
    CourseComponent,
    ModuleOnCourseComponent,
    TaskComponent,
    CourseModuleComponent,
    ModuleFooterComponent,
    CoursesComponent,
    LoginComponent,
    RegistrationComponent,
    AboutMeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
