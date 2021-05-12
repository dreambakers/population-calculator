import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmassesComponent } from './landmasses.component';

describe('LandmassesComponent', () => {
  let component: LandmassesComponent;
  let fixture: ComponentFixture<LandmassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
