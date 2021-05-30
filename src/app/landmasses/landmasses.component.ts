import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { v4 as uuid } from 'uuid';
import { Landmass } from '../calculations/models/landmass.model';
import { World } from '../calculations/models/world.model';

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
