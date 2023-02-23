import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFooterComponent } from './module-footer.component';

describe('ModuleFooterComponent', () => {
  let component: ModuleFooterComponent;
  let fixture: ComponentFixture<ModuleFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
