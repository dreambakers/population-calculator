import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { SingleOrMultiDataSet } from 'ng2-charts';
import { DataService, Landmass, LandmassPopulationDemographics, Nation, NationPopulationDemographics, SimpleAndPiechartDemographics } from 'src/app/services/data.service';
import { Utility } from '../../utils/utility';

@Component({
  selector: 'app-simple-and-piechart-demographics',
  templateUrl: './simple-and-piechart-demographics.component.html',
  styleUrls: ['./simple-and-piechart-demographics.component.scss']
})
export class SimpleAndPiechartDemographicsComponent implements OnInit {

  simpleAndPieChartDemographics: SimpleAndPiechartDemographics = DataService.getSelectedLandmass().simpleAndPiechartDemographics;
  selectedDemographicsObject!: NationPopulationDemographics | LandmassPopulationDemographics;
  selectedPopulationObject!: Nation | Landmass;
  addNewEthnicity: boolean = false;
  newEthnicity = '';
  hide = false;

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

    console.log(this.selectedDemographicsObject)
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

  getClassLevelPerPopulationLabels() {
    return Object.keys(this.selectedDemographicsObject.variables.classLevelsPerPopulation).map(
      key => {
        switch(key) {
          case 'wp':
            return 'Wealthy Population';
          case 'mc':
            return 'Middle Class';
          case 'pp':
            return 'Poor Population';
          case 'sp':
            return 'Slave Population';
          default:
            return ''
        }
      }
    );
  }

  addEthnicity() {
    if (this.addNewEthnicity) {
      this.selectedDemographicsObject.variables.ethnicityPerPopulation.push({
        name: this.newEthnicity,
        percentage: ''
      });
      this.newEthnicity = '';
      this.hide = true;
      setTimeout(() => {
        // TODO: refactor
        this.hide = false;
      }, 1);
    }
    this.addNewEthnicity = !this.addNewEthnicity;
  }

  getEthnicityLabels() {
    return this.ethnicities.map(
      ethnicity => ethnicity.name
    );
  }

  getEthnicityData() {
    return this.ethnicities.map(
      ethnicity => ethnicity.percentage
    );
  }

  get ethnicities() {
    return this.selectedDemographicsObject.variables.ethnicityPerPopulation;
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
