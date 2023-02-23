import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOnHomepageComponent } from './course-on-homepage.component';

describe('CourseOnHomepageComponent', () => {
  let component: CourseOnHomepageComponent;
  let fixture: ComponentFixture<CourseOnHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseOnHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOnHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
