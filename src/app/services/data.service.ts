import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { BaseCalculation } from '../calculations/models/base.model';
import { Nation, PopulationCalculation } from '../calculations/models/population.model';
import { CityCalculation, CityCalculationFunctions, CityCalculationVariables } from '../calculations/models/city.model';
import { SimpleAndPiechartDemographics, SimpleAndPiechartDemographicsVariables } from '../calculations/models/simple-and-piechart-demographics.model';
import { Utility } from '../utils/utility';
import { World } from '../calculations/models/world.model';
import { Landmass } from '../calculations/models/landmass.model';
import { CustomizedCity, CustomizedCityCalculation } from '../calculations/models/customized-cities.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static world: World = DataService.getDefaultWorldObject();

  public static setSelectedLandmass(selectedLandmassId: string) {
    DataService.world.selectedLandmass = selectedLandmassId;
  }

  public static getSelectedLandmass(): Landmass {
    return Utility.ensure(DataService.world.landmasses.find(landmass => landmass.id === DataService.world.selectedLandmass));
  }

  public static getDefaultWorldObject(): World {
    return {
      name: '',
      landmasses: []
    }
  }

  public static getDefaultLandmassObject(): Landmass {
    return {
      name: '',
      id: uuid(),
      baseCalculation: DataService.getDefaultBaseCalculationsObject(),
      populationCalculation: DataService.getDefaultPopulationCalculationObject(),
      simpleAndPiechartDemographics: DataService.getDefaultSimpleAndPiechartDemographicsObject(),
      cityCalculation: DataService.getDefaultCityCalculationObject(),
      customizedCityCalculation: DataService.getDefaultCustomizedCityCalculationObject(),
      type: 'landmass'
    };
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
      variables: {
        m: 52,
        f: 48,
        ey1: 5,
        ad1: 58,
        ch1: 37,
      },
      expanded: true,
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
      },
      npd2_calc: function(pop1) {
        const result = pop1/100*this.variables.npd1;
        if (!isNaN(result)) {
          this.variables.npd2 = result;
        }
      },
      p2_calc: function() {
        const result = this.variables.npd2/100*this.variables.p1;
        if (!isNaN(result)) {
          this.variables.p2 = result;
        }
      },
      p3_calc: function() {
        const result = this.variables.npd2 - this.variables.p2;
        if (!isNaN(result)) {
          this.variables.p3 = result;
        }
      },
      popd_calc: function() {
        const result = this.variables.p3/this.variables.cs1;
        if (!isNaN(result)) {
          this.variables.popd = result;
        }
      }
    };
  }

  public static getDefaultSimpleAndPiechartDemographicVariables(): SimpleAndPiechartDemographicsVariables {
    const defaultChartObject = { name: '', percentage: ''}
    return {
      classLevelsPerPopulation: {},
      educationPerPopulation: {},
      culturePerPopulation: [{...defaultChartObject}],
      ethnicityPerPopulation: [{...defaultChartObject}],
      religionPerPopulation: [{...defaultChartObject}],
      racePerPopulation: [{...defaultChartObject}],
      languagePerPopulation: [{...defaultChartObject}],
      politicalAffliationsPerPopulation: [{...defaultChartObject}]
    }
  }

  public static getDefaultSimpleAndPiechartDemographicsObject(): SimpleAndPiechartDemographics {
    return {
      selectedPopulation: 'landmass',
      nationPopulationDemographics: [],
      landmassPopulationDemographics: {
        variables: DataService.getDefaultSimpleAndPiechartDemographicVariables()
      }
    };
  }

  public static getDefaultCityCalculationVariables(): CityCalculationVariables {
    return {
      rr1: 1.0,
      rr2: 2.5,
      rr3: 1.8,
      rr4: 4.1,
      rr5: 3.5,
      rr6: 3.1,
      rr7: 84,
      rp1: 130000,
      rp2: 22000,
      rp3: 12000,
      rp4: 7000,
      rp5: 2000,
      rp6: 500,
      rp7: 80,
      ur1: 28,
      ur2: 14,
      ur3: 18,
      ur4: 15,
      ur5: 13,
      ur6: 8,
      ur7: 4,
      up1: 1500000,
      up2: 800000,
      up3: 250000,
      up4: 70000,
      up5: 10000,
      up6: 1500,
      up7: 120
    }
  }

  public static getDefaultCityCalculationObject(): CityCalculation {
    return {
      selectedPopulation: 'landmass',
      selectedCalculation: 'rural',
      nationCityCalculation: [],
      landmassCityCalculation: {
        variables: DataService.getDefaultCityCalculationVariables()
      },
      cp1_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        result = p3/100*(this.selectedCalculation === 'rural' ? +variables?.rr1 : +variables?.ur1);
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp1 = result;
        }
      },
      cp2_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        result = variables?.cp1/(this.selectedCalculation === 'rural' ? +variables?.rp1 : +variables?.up1);
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp2 = result;
        }
      },
      cp3_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        let variable2 = this.selectedCalculation === 'rural' ? +variables?.rr2 : +variables?.ur2;
        if (variables?.cp2 === 0) {
          result = (p3/100*variable2)+variables.cp1;
        } else {
          result = p3/100*variable2;
        }
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp3 = result;
        }
      },
      cp4_calc: function(p3) {
        let variables = this.selectedCalculationObj?.variables;
        let variable2 = this.selectedCalculation === 'rural' ? +variables?.rp2 : +variables?.up2;
        let result = variables?.cp3/variable2;
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp4 = result;
        }
      },
      cp5_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        let variable3 = this.selectedCalculation === 'rural' ? +variables?.rr3 : +variables?.ur3;
        if (variables?.cp4 === 0) {
          result = (p3/100*variable3)+variables.cp3;
        } else {
          result = p3/100*variable3;
        }
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp5 = result;
        }
      },
      cp6_calc: function(p3) {
        let variables = this.selectedCalculationObj?.variables;
        let variable3 = this.selectedCalculation === 'rural' ? +variables?.rp3 : +variables?.up3;
        let result = variables?.cp5/variable3;
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp6 = result;
        }
      },
      cp7_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        let variable4 = this.selectedCalculation === 'rural' ? +variables?.rr4 : +variables?.ur4;
        if (variables?.cp6 === 0) {
          result = (p3/100*variable4)+variables.cp5;
        } else {
          result = p3/100*variable4;
        }
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp7 = result;
        }
      },
      cp8_calc: function(p3) {
        let variables = this.selectedCalculationObj?.variables;
        let variable4 = this.selectedCalculation === 'rural' ? +variables?.rp4 : +variables?.up4;
        let result = variables?.cp7/variable4;
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp8 = result;
        }
      },
      cp9_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        let variable5 = this.selectedCalculation === 'rural' ? +variables?.rr5 : +variables?.ur5;
        if (variables?.cp8 === 0) {
          result = (p3/100*variable5)+variables.cp7;
        } else {
          result = p3/100*variable5;
        }
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp9 = result;
        }
      },
      cp10_calc: function(p3) {
        let variables = this.selectedCalculationObj?.variables;
        let variable5 = this.selectedCalculation === 'rural' ? +variables?.rp5 : +variables?.up5;
        let result = variables?.cp9/variable5;
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp10 = result;
        }
      },
      cp11_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        let variable6 = this.selectedCalculation === 'rural' ? +variables?.rr6 : +variables?.ur6;
        if (variables?.cp10 === 0) {
          result = (p3/100*variable6)+variables.cp9;
        } else {
          result = p3/100*variable6;
        }
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp11 = result;
        }
      },
      cp12_calc: function(p3) {
        let variables = this.selectedCalculationObj?.variables;
        let variable6 = this.selectedCalculation === 'rural' ? +variables?.rp6 : +variables?.up6;
        let result = variables?.cp11/variable6;
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp12 = result;
        }
      },
      cp13_calc: function(p3) {
        let result;
        let variables = this.selectedCalculationObj?.variables;
        let variable7 = this.selectedCalculation === 'rural' ? +variables?.rr7 : +variables?.ur7;
        if (variables?.cp12 === 0) {
          result = (p3/100*variable7)+variables.cp11;
        } else {
          result = p3/100*variable7;
        }
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp13 = result;
        }
      },
      cp14_calc: function(p3) {
        let variables = this.selectedCalculationObj?.variables;
        let variable7 = this.selectedCalculation === 'rural' ? +variables?.rp7 : +variables?.up7;
        let result = variables?.cp13/variable7;
        if (!isNaN(result)) {
          this.selectedCalculationObj!.variables.cp14 = result;
        }
      },
      calculateAll: function (p3) {
        Object.keys(this).forEach((_key) => {
          const key = _key as keyof CityCalculationFunctions;
          if (key.includes('_calc') && typeof this[key] === 'function') {
            this[key](p3);
          }
        });
      }
    };
  }

  public static getDefaultCustomizedCityObject(): CustomizedCity {
    return {
      type: 'super_dense',
      variables: {
        ccsdc: 56.6,
        ccdc: 44.5,
        ccsc: 40.1,
        ccssc: 33.2,

        ccsdcp: 25000,
        ccdcp: 20000,
        ccscp: 5000,
        ccsscp: 3500,

        usdc: 33.2,
        udc: 40.1,
        usc: 44.5,
        ussc: 40.1,

        usdcp: 1500,
        udcp: 1000,
        uscp: 2500,
        usscp: 3000,

        msdc: 10.2,
        mdc: 15.4,
        msc: 15.4,
        mssc: 26.7,

        msdcp: 150,
        mdcp: 200,
        mscp: 500,
        msscp: 1000
      },
      expanded: true,
      cip_calc: function() {
        let cc;
        switch(this.type) {
          case 'super_dense':
            cc = this.variables.ccsdc;
            break;
          case 'dense':
            cc = this.variables.ccdc;
            break;
          case 'sparse':
            cc = this.variables.ccsc;
            break;
          case 'super_sparse':
            cc = this.variables.ccssc;
            break;
        }

        let result = this.variables.pic/cc;
        if (!isNaN(result)) {
          this.variables.cip = result;
        }
      },
      cia_calc: function() {
        let ccp;
        switch(this.type) {
          case 'super_dense':
            ccp = this.variables.ccsdcp;
            break;
          case 'dense':
            ccp = this.variables.ccdcp;
            break;
          case 'sparse':
            ccp = this.variables.ccscp;
            break;
          case 'super_sparse':
            ccp = this.variables.ccsscp;
            break;
        }
        let result = this.variables.cip/ccp;
        if (!isNaN(result)) {
          this.variables.cia = result;
        }
      },
      urp_calc: function() {
        let u;
        switch(this.type) {
          case 'super_dense':
            u = this.variables.usdc;
            break;
          case 'dense':
            u = this.variables.udc;
            break;
          case 'sparse':
            u = this.variables.usc;
            break;
          case 'super_sparse':
            u = this.variables.ussc;
            break;
        }
        let result = this.variables.pic/100*u;
        if (!isNaN(result)) {
          this.variables.urp = result;
        }
      },
      ura_calc: function() {
        let up;
        switch(this.type) {
          case 'super_dense':
            up = this.variables.usdcp;
            break;
          case 'dense':
            up = this.variables.udcp;
            break;
          case 'sparse':
            up = this.variables.uscp;
            break;
          case 'super_sparse':
            up = this.variables.usscp;
            break;
        }
        let result = this.variables.urp*up;
        if (!isNaN(result)) {
          this.variables.ura = result;
        }
      },
      mep_calc: function() {
        let m;
        switch(this.type) {
          case 'super_dense':
            m = this.variables.msdc;
            break;
          case 'dense':
            m = this.variables.mdc;
            break;
          case 'sparse':
            m = this.variables.msc;
            break;
          case 'super_sparse':
            m = this.variables.mssc;
            break;
        }
        let result = this.variables.pic/100*m;
        if (!isNaN(result)) {
          this.variables.mep = result;
        }
      },
      mea_calc: function() {
        let mp;
        switch(this.type) {
          case 'super_dense':
            mp = this.variables.msdcp;
            break;
          case 'dense':
            mp = this.variables.mdcp;
            break;
          case 'sparse':
            mp = this.variables.mscp;
            break;
          case 'super_sparse':
            mp = this.variables.msscp;
            break;
        }
        let result = this.variables.mep*mp;
        if (!isNaN(result)) {
          this.variables.mea = result;
        }
      },
      calculateAll: function() {
        this.cip_calc();
        this.cia_calc();
        this.urp_calc();
        this.ura_calc();
        this.mep_calc();
        this.mea_calc();
      }
    };
  }

  public static getDefaultCustomizedCityCalculationObject(): CustomizedCityCalculation {
    return {
      cites: [
        DataService.getDefaultCustomizedCityObject()
      ]
    };
  }

  constructor() { }
}
