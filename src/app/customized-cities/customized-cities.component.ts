import { Component, OnInit } from '@angular/core';
import { CustomizedCityCalculation } from '../calculations/models/customized-cities.model';
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

  get customizedCities() {
    return this.customizedCityCalculation.cites;
  }

}
