import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

export interface BaseCalculationVariables {
  a1: any;
  f1: any;
  f2: any;
  df1: any;
  df2: any;
  m1: any;
  m2: any;
  ra1: any;
  ra2: any;
  fw1: any;
  fw2: any;
  dt1: any;
  dt2: any;
  ds1: any;
  ds2: any;
  fl1: any;
  fm1: any;
  tm1: any;
  mm1: any;
  fmt1: any;
  pop1: any;
}
export interface BaseCalculation extends BaseCalculationVariables {
  precedanceMap: any;
  f1_calc(): void;
  f2_calc(): void;
  df1_calc(): void;
  df2_calc(): void;
  m1_calc(): void;
  m2_calc(): void;
  ra1_calc(): void;
  ra2_calc(): void;
  fw1_calc(): void;
  fw2_calc(): void;
  dt1_calc(): void;
  dt2_calc(): void;
  ds1_calc(): void;
  ds2_calc(): void;
  performBackgroundCalculations(): void;
  calculateAll(): void;
}
export interface Landmass {
  name: string;
  editing?: boolean;
  id: string;
  baseCalculation: BaseCalculation;
}

export interface World {
  name: string;
  landmasses: Landmass[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static world: World = {
    name: 'test', landmasses: [{
      name: 'test',
      id: uuid(),
      baseCalculation: DataService.getDefaultBaseCalculationsObject()
    }]
  };

  public static getDefaultBaseCalculationsObject(): BaseCalculation {
    const baseCalculationObject: BaseCalculation = {
      a1: null,
      f1: null,
      f2: null,
      df1: null,
      df2: null,
      m1: null,
      m2: null,
      ra1: null,
      ra2: null,
      fw1: null,
      fw2: null,
      dt1: null,
      dt2: null,
      ds1: null,
      ds2: null,
      fl1: null,
      fm1: null,
      tm1: null,
      mm1: null,
      fmt1: null,
      pop1: null,
      precedanceMap: {},

      f1_calc: function () {
        this.f1 = this.a1 / 100 * this.f2;
      },

      f2_calc: function () {
        this.f2 = this.f1 / this.a1 * 100;
      },

      df1_calc: function () {
        this.df1 = this.a1 / 100 * this.df2;
      },

      df2_calc: function () {
        this.df2 = this.df1 / this.a1 * 100
      },

      m1_calc: function () {
        this.m1 = this.a1 / 100 * this.m2;
      },

      m2_calc: function () {
        this.m2 = this.m1 / this.a1 * 100;
      },

      ra1_calc: function () {
        this.ra1 = this.a1 / 100 * this.ra2;
      },

      ra2_calc: function () {
        this.ra2 = this.ra1 / this.a1 * 100;
      },

      fw1_calc: function () {
        this.fw1 = this.a1 / 100 * this.fw2;
      },

      fw2_calc: function () {
        this.fw2 = this.fw1 / this.a1 * 100;
      },

      dt1_calc: function () {
        this.dt1 = this.a1 / 100 * this.dt2;
      },

      dt2_calc: function () {
        this.dt2 = this.dt1 / this.a1 * 100;
      },

      ds1_calc: function () {
        this.ds1 = this.a1 / 100 * this.ds2;
      },

      ds2_calc: function () {
        this.ds2 = this.ds1 / this.a1 * 100;
      },

      performBackgroundCalculations: function () {
        if ([this.a1, this.f1, this.df1, this.ra1, this.m1, this.fw1, this.ds1].every(val => val !== null)) {
          this.fl1 = this.a1 - ((this.f1 / 7, 5) + (this.df1 / 5) + (this.ra1 / 2, 5) + (this.m1 / 0, 5) + (this.fw1 / 7, 5) + (this.ds1 / 0, 5) + this.dt1)

          this.fm1 = this.fl1 / this.a1 * 100;

          if (this.tm1 !== null && this.mm1 !== null) {
            this.fmt1 = this.fm1 * ((this.tm1 / 10) + (this.mm1 / 10 / 10));
            this.pop1 = this.a1*this.fmt1;
          }
        }
      },

      calculateAll: function () {
        Object.keys(this).forEach((_key) => {
          const key = _key as keyof BaseCalculation;
          if (key.includes('_calc') && typeof this[key] === 'function') {
            let variable = key.split(/([0-9]+)/);
            // Only run the calculation function again if this variable wasn't modified by the user
            if (this.precedanceMap[variable[0]] !== variable[1]) {
              this[key]();
            }
          }
        });
      }
    }
    return baseCalculationObject;
  }

  constructor() { }
}
