import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOnCourseComponent } from './module-on-course.component';

describe('ModuleOnCourseComponent', () => {
  let component: ModuleOnCourseComponent;
  let fixture: ComponentFixture<ModuleOnCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleOnCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleOnCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
