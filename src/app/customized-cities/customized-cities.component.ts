import { Component, OnInit } from '@angular/core';
import { CustomizedCity, CustomizedCityCalculation, CustomizedCityVariables } from '../calculations/models/customized-cities.model';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-customized-cities',
  templateUrl: './customized-cities.component.html',
  styleUrls: ['./customized-cities.component.scss']
})
export class CustomizedCitiesComponent implements OnInit {

  customizedCityCalculation: CustomizedCityCalculation = DataService.getSelectedLandmass().customizedCityCalculation;
  addNewCity = false;
  newCity = '';

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  addCity() {
    if (this.addNewCity) {
      this.customizedCityCalculation.cites.push({
        ...DataService.getDefaultCustomizedCityObject(),
        name: this.newCity
      });
      this.newCity = '';
    }
    this.addNewCity = !this.addNewCity;
  }

  onTableValueUpdate(newValue: string, key: keyof CustomizedCityVariables, city: CustomizedCity) {
    city.variables[key] = +newValue;
    city.calculateAll();
  }

  get customizedCities() {
    return this.customizedCityCalculation.cites;
  }

  deleteCity(city: CustomizedCity) {
    this.dialogService.confirm('Are you sure?', 'This will delete the selected city.').subscribe(
      res => {
        if (res) {
          this.customizedCityCalculation.cites = this.customizedCityCalculation.cites.filter(
            _city=> _city.id !== city.id
          );
        }
      }
    );
  }

  copyCity(city: CustomizedCity) {
    const newCityCopy = {
      ...DataService.getDefaultCustomizedCityObject(),
      variables: {
        ...city.variables
      },
    };
    this.customizedCityCalculation.cites.push(newCityCopy);
  }
}
