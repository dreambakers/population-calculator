import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/app.constants';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuid } from 'uuid';
import { Nation, NationCalculationVariables, PopulationCalculation } from '../models/population.model';

@Component({
  selector: 'app-population-calculation',
  templateUrl: './population-calculation.component.html',
  styleUrls: ['./population-calculation.component.scss']
})
export class PopulationCalculationComponent implements OnInit {

  constants = constants;
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

  onThreatChange(newValue: string, key: keyof NationCalculationVariables, nation: Nation) {
    nation.variables[key] = +newValue;
    nation.ttm_calc();
  }

  getSliderLabel(value: number, sliderKey: keyof typeof constants.sliderLabels) {
    const labels = constants.sliderLabels[sliderKey];
    if (value >= 91 && value <= 100) {
      return labels[10];
    } else if (value >= 81 && value <= 90) {
      return labels[9];
    } else if (value >= 71 && value <= 80) {
      return labels[8];
    } else if (value >= 61 && value <= 70) {
      return labels[7];
    } else if (value >= 51 && value <= 60) {
      return labels[6];
    } else if (value >= 41 && value <= 50) {
      return labels[5];
    } else if (value >= 31 && value <= 40) {
      return labels[4];
    } else if (value >= 21 && value <= 30) {
      return labels[3];
    } else if (value >= 11 && value <= 20) {
      return labels[2];
    } else if (value >= 1 && value <= 10) {
      return labels[1];
    } else {
      return labels[0];
    }
  }

  get selectedLandmass() {
    return DataService.getSelectedLandmass();
  }
}
