import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CityCalculation, CityCalculationVariables, DataService, Landmass, LandmassCityCalculation, Nation, NationCityCalculation } from 'src/app/services/data.service';
import { Utility } from 'src/app/utils/utility';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cityCalculation: CityCalculation = DataService.getSelectedLandmass().cityCalculation;
  selectedCalculationObject!: NationCityCalculation | LandmassCityCalculation;
  selectedPopulationObject!: Nation | Landmass;

  constructor() { }

  ngOnInit(): void {
  }

  onPopulationSelectionChange($event: MatSelectChange) {
     // Landmass Calculation Selected
     this.selectedPopulationObject = $event.value;
     if ($event.value.type === 'landmass') {
       this.selectedCalculationObject = this.cityCalculation.landmassCityCalculation;
     } else {
       console.log(this.cityCalculation?.nationCityCalculation)
       this.selectedCalculationObject = Utility.ensure(
         this.cityCalculation?.nationCityCalculation?.find(
           nation => nation?.id === $event.value.id
         )
       );
     }
  }

  getTableValueKey(variableKey: string) {
    const urbanOrRuralModifier = this.cityCalculation.selectedCalculation === 'rural' ? 'r' : 'u';
    const key = `${urbanOrRuralModifier}${variableKey}` as keyof CityCalculationVariables;
    console.log(key)
    return this.selectedCalculationObject.variables[key];
  }

  isNaN(value: any) {
    return isNaN(value);
  }

  get landmass() {
    return DataService.getSelectedLandmass();
  }

  get nations() {
    return this.landmass.populationCalculation.nations;
  }

}