import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuid } from 'uuid';
import { Nation, NationCalculationVariables, PopulationCalculation } from '../models/population.model';

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

  ngOnInit(): void { }

  addNation() {
    if (this.addNewNation) {
      const defaultNationObj = DataService.getDefaultNationObject();
      this.populationCalculation.nations.push({
        ...defaultNationObj,
        name: this.newNation
      });
      // TODO: REFACTOR THIS
      this.selectedLandmass.simpleAndPiechartDemographics.nationPopulationDemographics?.push({
        id: defaultNationObj.id,
        variables: DataService.getDefaultSimpleAndPiechartDemographicVariables()
      });
      this.selectedLandmass.cityCalculation.nationCityCalculation?.push({
        id: defaultNationObj.id,
        variables: DataService.getDefaultCityCalculationVariables()
      });
      this.newNation = '';
    }
    this.addNewNation = !this.addNewNation;
  }

  copyNation(nation: Nation) {
    const newNationCopy = {
      ...DataService.getDefaultNationObject(),
      variables: {
        ...nation.variables
      },
      id: uuid()
    };
    this.populationCalculation.nations.push(newNationCopy);
    // TODO: REFACTOR THIS
    this.selectedLandmass.simpleAndPiechartDemographics.nationPopulationDemographics?.push({
      id: newNationCopy.id,
      variables: DataService.getDefaultSimpleAndPiechartDemographicVariables()
    });
    this.selectedLandmass.cityCalculation.nationCityCalculation?.push({
      id: newNationCopy.id,
      variables: DataService.getDefaultCityCalculationVariables()
    });
  }

  deleteNation(nation: Nation) {
    this.populationCalculation.nations = this.populationCalculation.nations.filter(
      _nation => _nation.id !== nation.id
    );
    // TODO: REFACTOR THIS
    let nationPopulationDemographics = this.selectedLandmass.simpleAndPiechartDemographics.nationPopulationDemographics;
    let nationCityCalculation = this.selectedLandmass.cityCalculation.nationCityCalculation;
    const index1 = nationPopulationDemographics?.findIndex(_nation => _nation?.id === nation.id) || -1;
    const index2 = nationCityCalculation?.findIndex(_nation => _nation?.id === nation.id) || -1;
    if (index1 > -1) {
      nationPopulationDemographics?.splice(index1, 1);
    }
    if (index2 > -1) {
      nationCityCalculation?.splice(index2, 1);
    }
  }

  onCountrySizeUpdate(newVal: string, nation: Nation, key: keyof NationCalculationVariables) {
    if (key === 'cs1') {
      nation.variables.cs1 = +newVal;
      nation.cs2_calc(this.selectedLandmass.baseCalculation.variables.a1);
    } else {
      nation.variables.cs2 = +newVal;
      nation.cs1_calc(this.selectedLandmass.baseCalculation.variables.a1);
    }
  }

  onPopulationDistributionChange(newVal: string, nation: Nation) {
    nation.variables.npd1 = +newVal;
    nation.npd2_calc(this.selectedLandmass.baseCalculation.variables.pop1);
    this.runAllCalculations(nation);
  }

  onDisasterLossesChange(newVal: string, nation: Nation) {
    nation.variables.p1 = +newVal;
    this.runAllCalculations(nation);
  }

  runAllCalculations(nation: Nation) {
    nation.p2_calc();
    nation.p3_calc();
    nation.popd_calc();
    this.runTableCalculations(nation);
  }

  runTableCalculations(nation: Nation) {
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

  onTableValueUpdate(nation: Nation) {
    this.runTableCalculations(nation);
  }

  updateTTM(nation: Nation) {
    nation.ttm_calc();
  }

  get selectedLandmass() {
    return DataService.getSelectedLandmass();
  }
}
