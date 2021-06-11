import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { v4 as uuid } from 'uuid';
import { Landmass } from '../calculations/models/landmass.model';
import { World } from '../calculations/models/world.model';
import { Nation } from '../calculations/models/population.model';
import { CustomizedCity } from '../calculations/models/customized-cities.model';

@Component({
  selector: 'app-landmasses',
  templateUrl: './landmasses.component.html',
  styleUrls: ['./landmasses.component.scss']
})
export class LandmassesComponent implements OnInit {

  landmasses: Landmass[] = DataService.world.landmasses;
  addNewLandmass = false;
  newLandmass = '';

  constructor() { }

  ngOnInit(): void {
  }

  copyLandmass(lm: Landmass) {
    // Making a deep copy without the object functions. Otherwise, new object gets functions of old reference
    let landmass: Landmass = JSON.parse(JSON.stringify(lm));

    const getNations = (nations: Nation[]): Nation[] => {
      return nations.map(nation => {
        return {
          ...DataService.getDefaultNationObject(),
          ...nation
        }
      });
    }

    const getCustomizedCities = (cities: CustomizedCity[]): CustomizedCity[] => {
      return cities.map(city => {
        return {
          ...DataService.getDefaultCustomizedCityObject(),
          ...city
        }
      });
    }

    const newLandmass: Landmass = {
      id: uuid(),
      name: landmass.name,
      type: 'landmass',
      baseCalculation: {
        ...DataService.getDefaultBaseCalculationsObject(),
        ...landmass.baseCalculation
      },
      populationCalculation: {
        nations: getNations(landmass.populationCalculation.nations)
      },
      simpleAndPiechartDemographics: landmass.simpleAndPiechartDemographics,
      cityCalculation: {
        ...DataService.getDefaultCityCalculationObject(),
        ...landmass.cityCalculation
      },
      customizedCityCalculation: {
        cites: getCustomizedCities(landmass.customizedCityCalculation.cites)
      }
    }
    this.landmasses.push(newLandmass);
  }

  deleteLandmass(landmass: Landmass) {
    this.landmasses = this.landmasses.filter(
      _landmass => _landmass.id !== landmass.id
    );
  }

  addLandmass() {
    if (this.addNewLandmass) {
      this.landmasses.push({
        ...DataService.getDefaultLandmassObject(),
        name: this.newLandmass,
      });
      this.newLandmass = '';
    }
    this.addNewLandmass = !this.addNewLandmass;
  }

  get world(): World {
    return DataService.world;
  }
}
