import { Component, OnInit } from '@angular/core';
import { DataService, Landmass } from '../services/data.service';
import { v4 as uuid } from 'uuid';

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

  copyLandmass(landmass: Landmass) {
    this.landmasses.push({
      ...landmass,
      id: uuid()
    });
  }

  deleteLandmass(landmass: Landmass) {
    this.landmasses = this.landmasses.filter(
      _landmass => _landmass.id !== landmass.id
    );
  }

  addLandmass() {
    if (this.addNewLandmass) {
      this.landmasses.push({
        name: this.newLandmass,
        type: 'landmass',
        id: uuid(),
        baseCalculation: DataService.getDefaultBaseCalculationsObject(),
        populationCalculation: DataService.getDefaultPopulationCalculationObject(),
        simpleAndPiechartDemographics: DataService.getDefaultSimpleAndPiechartDemographicsObject()
      });
      this.newLandmass = '';
    }
    this.addNewLandmass = !this.addNewLandmass;
  }
}
