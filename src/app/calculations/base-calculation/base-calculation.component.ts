import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-base-calculation',
  templateUrl: './base-calculation.component.html',
  styleUrls: ['./base-calculation.component.scss']
})
export class BaseCalculationComponent implements OnInit {

  baseCalculation:any = {
    a1: null,
    f1: null,
    f2: null,
    precedanceMap: {},

    f1_calc: function() {
      this.f1 = this.a1/100*this.f2;
    },

    f2_calc: function() {
      this.f2 = this.f1/this.a1*100;
    },

    calculateAll: function() {
      for (let key of Object.keys(this)) {
        if (key.includes('_calc') && typeof this[key] === 'function') {
          let variable = key.split(/([0-9]+)/);
          // Only run the calculation function again if this variable wasn't modified by the user
          if (this.precedanceMap[variable[0]] !== variable[1]) {
            this[key]();
          }
        }
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
    console.log(JSON.parse(JSON.stringify(this.baseCalculation)))
  }

  onChange(newVal: number, toUpdate: any, impacts: any) {
    /*
      keeping track of the variable which user intially inputs so
      it isn't impacted when the area is changed.
    */
    let variable = toUpdate.split(/([0-9]+)/);
    this.baseCalculation['precedanceMap'][variable[0]] = variable[1];

    this.baseCalculation[toUpdate] = newVal;
    this.baseCalculation[`${impacts}_calc`]();
  }

  onAreaUpdate(newArea: number) {
    this.baseCalculation['a1'] = newArea;
    this.baseCalculation['calculateAll']();
  }
}
