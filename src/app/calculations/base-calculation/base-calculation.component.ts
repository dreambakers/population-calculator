import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { DataService } from 'src/app/services/data.service';
import { BaseCalculation, BaseCalculationVariables } from '../models/base.model';


@Component({
  selector: 'app-base-calculation',
  templateUrl: './base-calculation.component.html',
  styleUrls: ['./base-calculation.component.scss']
})
export class BaseCalculationComponent implements OnInit {

  baseCalculation: BaseCalculation = DataService.getSelectedLandmass().baseCalculation;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(newVal: string, toUpdate: keyof BaseCalculationVariables, impacts: keyof BaseCalculationVariables) {
    /*
      keeping track of the variable which user intially inputs so
      it isn't impacted when the area is changed.
    */
    let variable = toUpdate.split(/([0-9]+)/);
    this.baseCalculation.precedanceMap[variable[0]] = variable[1];
    this.baseCalculation.variables[toUpdate] = newVal === '' ? null : +newVal;
    const functionKey = `${impacts}_calc` as keyof BaseCalculation;
    this.baseCalculation[functionKey]();
    this.baseCalculation.performBackgroundCalculations();
  }

  onModifierSelect(newVal: string | MatSelectChange | number, key: keyof BaseCalculationVariables) {
    this.baseCalculation.variables[key] = +newVal;
    this.baseCalculation.calculateAll();
    this.baseCalculation.performBackgroundCalculations();
  }

  onMagicModifierChange(newValue: number) {
    this.onModifierSelect(newValue/10, 'mm1');
  }

  isNaN(value: any) {
    return isNaN(value);
  }
}
