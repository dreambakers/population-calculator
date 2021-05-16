import { Component, OnInit } from '@angular/core';
import { DataService, Nation, NationCalculationVariables, PopulationCalculation } from 'src/app/services/data.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-population-calculation',
  templateUrl: './population-calculation.component.html',
  styleUrls: ['./population-calculation.component.scss']
})
export class PopulationCalculationComponent implements OnInit {

  populationCalculation: PopulationCalculation = DataService.getSelectedLandmass().populationCalculation;
  addNewNation = false;
  newNation = '';

  constructor() { }

  ngOnInit(): void {
     // TODO: REMOVE THIS!
     this.copyNation(DataService.getSelectedLandmass().populationCalculation.nations[0])
  }

  addNation() {
    if (this.addNewNation) {
      const defaultDynamicDemographicChartObject = { name: '', percentage: ''}
      const defaultNationObj = DataService.getDefaultNationObject();
      this.populationCalculation.nations.push({
        ...defaultNationObj,
        name: this.newNation
      });
      this.selectedLandmass.simpleAndPiechartDemographics.nationPopulationDemographics?.push({
        id: defaultNationObj.id,
        variables: {
          classLevelsPerPopulation: {},
          educationPerPopulation: {},
          culturePerPopulation: [{...defaultDynamicDemographicChartObject}],
          ethnicityPerPopulation: [{...defaultDynamicDemographicChartObject}],
          religionPerPopulation: [{...defaultDynamicDemographicChartObject}],
          racePerPopulation: [{...defaultDynamicDemographicChartObject}],
          languagePerPopulation: [{...defaultDynamicDemographicChartObject}],
          politicalAffliationsPerPopulation: [{...defaultDynamicDemographicChartObject}]
        }
      });
      this.newNation = '';
    }
    this.addNewNation = !this.addNewNation;
  }

  copyNation(nation: Nation) {
    const defaultDynamicDemographicChartObject = { name: '', percentage: ''}
    const newNationCopy = {
      ...nation,
      id: uuid()
    };
    this.populationCalculation.nations.push(newNationCopy);
    this.selectedLandmass.simpleAndPiechartDemographics.nationPopulationDemographics?.push({
      id: newNationCopy.id,
      variables: {
        classLevelsPerPopulation: {},
        educationPerPopulation: {},
        culturePerPopulation: [{...defaultDynamicDemographicChartObject}],
        ethnicityPerPopulation: [{...defaultDynamicDemographicChartObject}],
        religionPerPopulation: [{...defaultDynamicDemographicChartObject}],
        racePerPopulation: [{...defaultDynamicDemographicChartObject}],
        languagePerPopulation: [{...defaultDynamicDemographicChartObject}],
        politicalAffliationsPerPopulation: [{...defaultDynamicDemographicChartObject}]
      }
    });
  }

  deleteNation(nation: Nation) {
    this.populationCalculation.nations = this.populationCalculation.nations.filter(
      _nation => _nation.id !== nation.id
    );
    let nationPopulationDemographics = this.selectedLandmass.simpleAndPiechartDemographics.nationPopulationDemographics;
    const index = nationPopulationDemographics?.findIndex(_nation => _nation?.id === nation.id) || -1;
    if (index > -1) {
      nationPopulationDemographics?.splice(index, 1);
    }
  }

  onCountrySizeUpdate(newVal: string, nation: Nation) {
    if (nation.countrySizeCalculationPreference === 'area') {
      nation.variables.cs1 = +newVal;
      nation.cs2_calc(this.selectedLandmass.baseCalculation.variables.a1);
    } else {
      nation.variables.cs2 = +newVal;
      nation.cs1_calc(this.selectedLandmass.baseCalculation.variables.a1);
    }
  }

  onTableValueUpdate(nation: Nation) {
    nation.ey2_calc();
    nation.ey3_calc();
    nation.ey4_calc();

    nation.ad2_calc();
    nation.ad3_calc();
    nation.ad4_calc();

    nation.ch2_calc();
    nation.ch3_calc();
    nation.ch4_calc();
  }

  updateTTM(nation: Nation) {
    nation.ttm_calc();
  }

  get selectedLandmass() {
    return DataService.getSelectedLandmass();
  }
}
