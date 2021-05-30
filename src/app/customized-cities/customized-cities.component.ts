import { Component, OnInit } from '@angular/core';
import { CustomizedCity, CustomizedCityCalculation, CustomizedCityVariables } from '../calculations/models/customized-cities.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-customized-cities',
  templateUrl: './customized-cities.component.html',
  styleUrls: ['./customized-cities.component.scss']
})
export class CustomizedCitiesComponent implements OnInit {

  customizedCityCalculation: CustomizedCityCalculation = DataService.getSelectedLandmass().customizedCityCalculation;

  constructor() { }

  ngOnInit(): void {
  }

  addCity() {
    this.customizedCityCalculation.cites.push(DataService.getDefaultCustomizedCityObject());
  }

  onTableValueUpdate(newValue: string, key: keyof CustomizedCityVariables, city: CustomizedCity) {
    city.variables[key] = +newValue;
    city.calculateAll();
  }

  get customizedCities() {
    return this.customizedCityCalculation.cites;
  }

}
