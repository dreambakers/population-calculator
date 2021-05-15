import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAndPiechartDemographicsComponent } from './simple-and-piechart-demographics.component';

describe('SimpleAndPiechartDemographicsComponent', () => {
  let component: SimpleAndPiechartDemographicsComponent;
  let fixture: ComponentFixture<SimpleAndPiechartDemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleAndPiechartDemographicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAndPiechartDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
