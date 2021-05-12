import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationCalculationComponent } from './population-calculation.component';

describe('PopulationCalculationComponent', () => {
  let component: PopulationCalculationComponent;
  let fixture: ComponentFixture<PopulationCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
