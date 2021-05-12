import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCalculationComponent } from './base-calculation.component';

describe('BaseCalculationComponent', () => {
  let component: BaseCalculationComponent;
  let fixture: ComponentFixture<BaseCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
