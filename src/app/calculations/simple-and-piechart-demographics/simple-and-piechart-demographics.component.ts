import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MultiLineLabel, SingleOrMultiDataSet } from 'ng2-charts';
import { constants } from 'src/app/app.constants';
import { DataService } from 'src/app/services/data.service';
import { Utility } from '../../utils/utility';
import { Landmass } from '../models/landmass.model';
import { Nation } from '../models/population.model';
import {
  LandmassPopulationDemographics,
  NationPopulationDemographics,
  SimpleAndPiechartDemographics,
  SimpleAndPiechartDemographicsVariables
} from '../models/simple-and-piechart-demographics.model';

@Component({
  selector: 'app-simple-and-piechart-demographics',
  templateUrl: './simple-and-piechart-demographics.component.html',
  styleUrls: ['./simple-and-piechart-demographics.component.scss']
})
export class SimpleAndPiechartDemographicsComponent implements OnInit {
  constants = constants;
  simpleAndPieChartDemographics: SimpleAndPiechartDemographics = DataService.getSelectedLandmass().simpleAndPiechartDemographics;
  selectedDemographicsObject!: NationPopulationDemographics | LandmassPopulationDemographics;
  selectedPopulationObject!: Nation | Landmass;
  private commonChartMapFields = {
    fieldName: '',
    addNew: false,
    rerender: false,
  };
  dynamicChartMap = {
    ethnicity: {
      key: 'ethnicityPerPopulation',
      ...this.commonChartMapFields
    },
    culture: {
      key: 'culturePerPopulation',
      ...this.commonChartMapFields
    },
    religion: {
      key: 'religionPerPopulation',
      ...this.commonChartMapFields
    },
    race: {
      key: 'racePerPopulation',
      ...this.commonChartMapFields
    },
    language: {
      key: 'languagePerPopulation',
      ...this.commonChartMapFields
    },
    politicalAffliation: {
      key: 'politicalAffliationsPerPopulation',
      ...this.commonChartMapFields
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  isNaN(value: any) {
    return isNaN(value);
  }

  onPopulationSelectionChange($event: MatSelectChange) {
    // Landmass Calculation Selected
    this.selectedPopulationObject = $event.value;
    if ($event.value.type === 'landmass') {
      this.selectedDemographicsObject = this.simpleAndPieChartDemographics.landmassPopulationDemographics;
    } else {
      console.log(this.simpleAndPieChartDemographics?.nationPopulationDemographics)
      this.selectedDemographicsObject = Utility.ensure(
        this.simpleAndPieChartDemographics?.nationPopulationDemographics?.find(
          nation => nation?.id === $event.value.id
        )
      );
    }
  }

  onMagicalPopulationUpdate(newValue: string) {
    this.selectedDemographicsObject.variables.mp1 = +newValue;
    const population = this.selectedPopulationObject.type === 'landmass' ?
                          this.selectedPopulationObject.baseCalculation.variables.pop1 :
                          this.selectedPopulationObject.variables.p3;
    this.selectedDemographicsObject.variables.mp2 = population/100*this.selectedDemographicsObject.variables.mp1;
    this.selectedDemographicsObject.variables.mp3 = population-(population/100*this.selectedDemographicsObject.variables.mp1);
  }

  getObjectValuesForChart(obj: any) {
    return Object.values(obj) as any as SingleOrMultiDataSet;
  }

  getChartLabelsForKey(key: keyof typeof constants.chartLabels) {
    return Object.values(this.constants.chartLabels[key]) as any as MultiLineLabel;
  }

  addNewChartField(chart: any) {
    if (chart.addNew) {
      const demographicObjectKey = chart.key as keyof SimpleAndPiechartDemographicsVariables;
      this.selectedDemographicsObject.variables[demographicObjectKey].push({
        name: chart.fieldName,
        percentage: ''
      });
      chart.fieldName = '';
      chart.rerender = true;
      setTimeout(() => {
        chart.rerender = false;
      }, 1);
    }
    chart.addNew = !chart.addNew;
  }

  getLabelsForDynamicChart(object: any) {
    return object.map(
      (object: any) => object.name
    );
  }

  getDataForDynamicChart(object: any) {
    return object.map(
      (object: any) => object.percentage
    );
  }

  getAccumulatedPercentageAndColor(values: number[]) {
    return {
      total: values.reduce((a, b) => (+a) + (+b), 0),
      color: function() {
        if (this.total < 100) {
          return '#0070C0';
        } else if (this.total === 100) {
          return '#28a745';
        }
        return '#dc3545';
      }
    }
  }

  get cultures() {
    return this.selectedDemographicsObject.variables.culturePerPopulation;
  }

  get ethnicities() {
    return this.selectedDemographicsObject.variables.ethnicityPerPopulation;
  }

  get religions() {
    return this.selectedDemographicsObject.variables.religionPerPopulation;
  }

  get languages() {
    return this.selectedDemographicsObject.variables.languagePerPopulation;
  }

  get politicalAffliations() {
    return this.selectedDemographicsObject.variables.politicalAffliationsPerPopulation;
  }

  get races() {
    return this.selectedDemographicsObject.variables.racePerPopulation;
  }

  get educationPerPopulation() {
    return this.selectedDemographicsObject.variables.educationPerPopulation;
  }

  get classLevelsPerPopulation() {
    return this.selectedDemographicsObject.variables.classLevelsPerPopulation;
  }

  get landmass() {
    return DataService.getSelectedLandmass();
  }

  get nations() {
    return this.landmass.populationCalculation.nations;
  }
}
