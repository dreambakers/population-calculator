import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedCitiesComponent } from './customized-cities.component';

describe('CustomizedCitiesComponent', () => {
  let component: CustomizedCitiesComponent;
  let fixture: ComponentFixture<CustomizedCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
