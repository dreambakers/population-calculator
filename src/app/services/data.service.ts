import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Utility } from '../utils/utility';
export interface SimpleAndPiechartDemographicsVariables {
  pcd?: any;
  mp1?: any;
  mp2?: any;
  mp3?: any;
  classLevelsPerPopulation: {
    wp?: any;
    mc?: any;
    pp?: any;
    sp?: any;
  };
  ethnicityPerPopulation: [{
    editing?: boolean,
    name: string,
    percentage: any
  }];
}

export interface LandmassPopulationDemographics {
  variables: SimpleAndPiechartDemographicsVariables;
}

export interface NationPopulationDemographics {
  id: string;
  variables: SimpleAndPiechartDemographicsVariables;
}

export interface SimpleAndPiechartDemographics {
  selectedPopulation: 'nation' | 'landmass';
  nationPopulationDemographics: [NationPopulationDemographics?];
  landmassPopulationDemographics: LandmassPopulationDemographics;
}
export interface NationCalculationVariables {
  totalPopulation?: any;
  npd1?: any;
  npd2?: any;
  cs1?: any;
  cs2?: any;
  cs3?: any;
  cs4?: any;
  popd?: any;
  p1?: any;
  p2?: any;
  p3?: any;
  m?: any;
  f?: any;
  ey1?: any;
  ey2?: any;
  ey3?: any;
  ey4?: any;
  ad1?: any;
  ad2?: any;
  ad3?: any;
  ad4?: any;
  ch1?: any;
  ch2?: any;
  ch3?: any;
  ch4?: any;
  ca?: any;
  it?: any;
  et?: any;
  ttm?: any;
}
export interface Nation {
  name: string;
  id: string;
  countrySizeCalculationPreference: 'area' | 'percentage';
  variables: NationCalculationVariables;
  editing?: boolean;
  type: 'nation';
  cs1_calc(area: any): void;
  cs2_calc(area: any): void;
  ey2_calc(): void;
  ey3_calc(): void;
  ey4_calc(): void;
  ad2_calc(): void;
  ad3_calc(): void;
  ad4_calc(): void;
  ch2_calc(): void;
  ch3_calc(): void;
  ch4_calc(): void;
  ttm_calc(): void;
  popd_cacl(): void;
}
export interface PopulationCalculation {
  nations: Nation[];
}
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
  populationCalculation: PopulationCalculation;
  simpleAndPiechartDemographics: SimpleAndPiechartDemographics;
  type: 'landmass';
}

export interface World {
  name: string;
  landmasses: Landmass[];
  selectedLandmass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static id = uuid(); //TODO: REMOVE
  public static world: World = {
    name: 'test',
    selectedLandmass: DataService.id,
    landmasses: [{
      name: 'test',
      id: DataService.id,
      baseCalculation: DataService.getDefaultBaseCalculationsObject(),
      populationCalculation: DataService.getDefaultPopulationCalculationObject(),
      simpleAndPiechartDemographics: DataService.getDefaultSimpleAndPiechartDemographicsObject(),
      type: 'landmass'
    }]
  };

  public static setSelectedLandmass(selectedLandmassId: string) {
    DataService.world.selectedLandmass = selectedLandmassId;
  }

  public static getSelectedLandmass(): Landmass {
    return Utility.ensure(DataService.world.landmasses.find(landmass => landmass.id === DataService.world.selectedLandmass));
  }

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
        if ([this.variables.a1, this.variables.f1, this.variables.df1, this.variables.ra1, this.variables.m1, this.variables.fw1, this.variables.ds1].every(val => !isNaN(val))) {
          this.variables.fl1 = this.variables.a1 - ((this.variables.f1 / 7, 5) + (this.variables.df1 / 5) + (this.variables.ra1 / 2, 5) + (this.variables.m1 / 0, 5) + (this.variables.fw1 / 7, 5) + (this.variables.ds1 / 0, 5) + this.variables.dt1)
          this.variables.fm1 = this.variables.fl1 / this.variables.a1 * 100;
          if (!isNaN(this.variables.tm1) && !isNaN(this.variables.mm1)) {
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

  public static getDefaultPopulationCalculationObject(): PopulationCalculation {
    return {
      nations: [
        this.getDefaultNationObject()
      ]
    }
  }

  public static getDefaultNationObject(): Nation {
    return {
      name: 'test',
      type: 'nation',
      id: uuid(),
      countrySizeCalculationPreference: 'area',
      variables: {
        p3: 50, //TODO: REMOVE THIS!!
        m: 52,
        f: 48,
        ey1: 5,
        ad1: 58,
        ch1: 37,
      },
      cs1_calc: function(area) {
        const result = area/100*this.variables.cs2;
        if (!isNaN(result)) {
          this.variables.cs1 = result;
        }
      },
      cs2_calc: function(area) {
        const result = this.variables.cs1/area*100;
        if (!isNaN(result)) {
          this.variables.cs2 = result;
        }
      },
      popd_cacl: function() {
        if (this.countrySizeCalculationPreference === 'area') {
          const result = this.variables.p3/this.variables.cs1;
          if (!isNaN(result)) {
            this.variables.popd = result;
          }
        } else {
          const result = this.variables.p3/this.variables.cs2;
          if (!isNaN(result)) {
            this.variables.popd = result;
          }
        }
      },
      ey2_calc: function() {
        const result = (this.variables.p3/100*this.variables.m)/100*this.variables.ey1;
        if (!isNaN(result)) {
          this.variables.ey2 = result;
        }
      },
      ey3_calc: function() {
        const result = (this.variables.p3/100*this.variables.f)/100*this.variables.ey1;
        if (!isNaN(result)) {
          this.variables.ey3 = result;
        }
      },
      ey4_calc: function() {
        const result = this.variables.ey2 + this.variables.ey3;
        if (!isNaN(result)) {
          this.variables.ey4 = result;
        }
      },
      ad2_calc: function() {
        const result = (this.variables.p3/100*this.variables.m)/100*this.variables.ad1;
        if (!isNaN(result)) {
          this.variables.ad2 = result;
        }
      },
      ad3_calc: function() {
        const result = (this.variables.p3/100*this.variables.f)/100*this.variables.ad1;
        if (!isNaN(result)) {
          this.variables.ad3 = result;
        }
      },
      ad4_calc: function() {
        const result = this.variables.ad2 + this.variables.ad3;
        if (!isNaN(result)) {
          this.variables.ad4 = result;
        }
      },
      ch2_calc: function() {
        const result = (this.variables.p3/100*this.variables.m)/100*this.variables.ch1;
        if (!isNaN(result)) {
          this.variables.ch2 = result;
        }
      },
      ch3_calc: function() {
        const result = (this.variables.p3/100*this.variables.f)/100*this.variables.ch1;
        if (!isNaN(result)) {
          this.variables.ch3 = result;
        }
      },
      ch4_calc: function() {
        const result = this.variables.ch2 + this.variables.ch3;
        if (!isNaN(result)) {
          this.variables.ch4 = result;
        }
      },
      ttm_calc: function() {
        const result = this.variables.ca + this.variables.it + this.variables.et;
        if (!isNaN(result)) {
          this.variables.ttm = result;
        }
      }
    };
  }

  public static getDefaultSimpleAndPiechartDemographicsObject(): SimpleAndPiechartDemographics {
    return {
      selectedPopulation: 'landmass',
      nationPopulationDemographics: [],
      landmassPopulationDemographics: {
        variables: {
          classLevelsPerPopulation: {},
          ethnicityPerPopulation: [{
            name: '',
            percentage: ''
          }]
        }
      }
    };
  }

  constructor() { }
}
