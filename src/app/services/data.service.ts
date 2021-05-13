import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

export interface BaseCalculationVariables {
  a1?: any;
  f1?: any;
  f2?: any;
  df1?: any;
  df2?: any;
  m1?: any;
  m2?: any;
  ra1?: any;
  ra2?: any;
  fw1?: any;
  fw2?: any;
  dt1?: any;
  dt2?: any;
  ds1?: any;
  ds2?: any;
  fl1?: any;
  fm1?: any;
  tm1?: any;
  mm1?: any;
  fmt1?: any;
  pop1?: any;
}
export interface BaseCalculation {
  variables: BaseCalculationVariables;
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
      variables: {},
      precedanceMap: {},

      f1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.f2;
        if (!isNaN(result)) {
          this.variables.f1 = result;
        }
      },

      f2_calc: function () {
        const result = this.variables.f1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.f2 = result;
        }
      },

      df1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.df2;
        if (!isNaN(result)) {
          this.variables.df1 = result;
        }
      },

      df2_calc: function () {
        const result = this.variables.df1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.df2 = result;
        }
      },

      m1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.m2;
        if (!isNaN(result)) {
          this.variables.m1 = result;
        }
      },

      m2_calc: function () {
        const result = this.variables.m1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.m2 = result;
        }
      },

      ra1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.ra2;
        if (!isNaN(result)) {
          this.variables.ra1 = result;
        }
      },

      ra2_calc: function () {
        const result = this.variables.ra1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.ra2 = result;
        }
      },

      fw1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.fw2;
        if (!isNaN(result)) {
          this.variables.fw1 = result;
        }
      },

      fw2_calc: function () {
        const result = this.variables.fw1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.fw2 = result;
        }
      },

      dt1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.dt2;
        if (!isNaN(result)) {
          this.variables.dt1 = result;
        }
      },

      dt2_calc: function () {
        const result = this.variables.dt1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.dt2 = result;
        }
      },

      ds1_calc: function () {
        const result = this.variables.a1 / 100 * this.variables.ds2;
        if (!isNaN(result)) {
          this.variables.ds1 = result;
        }
      },

      ds2_calc: function () {
        const result = this.variables.ds1 / this.variables.a1 * 100;
        if (!isNaN(result)) {
          this.variables.ds2 = result;
        }
      },

      performBackgroundCalculations: function () {
        if ([this.variables.a1, this.variables.f1, this.variables.df1, this.variables.ra1, this.variables.m1, this.variables.fw1, this.variables.ds1].every(val => val !== null)) {
          this.variables.fl1 = this.variables.a1 - ((this.variables.f1 / 7, 5) + (this.variables.df1 / 5) + (this.variables.ra1 / 2, 5) + (this.variables.m1 / 0, 5) + (this.variables.fw1 / 7, 5) + (this.variables.ds1 / 0, 5) + this.variables.dt1)
          this.variables.fm1 = this.variables.fl1 / this.variables.a1 * 100;
          if (this.variables.tm1 !== null && this.variables.mm1 !== null) {
            this.variables.fmt1 = this.variables.fm1 * ((this.variables.tm1 / 10) + (this.variables.mm1 / 10 / 10));
            this.variables.pop1 = this.variables.a1*this.variables.fmt1;
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
