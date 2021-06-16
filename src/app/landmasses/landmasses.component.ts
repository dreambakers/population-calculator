import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Landmass } from '../calculations/models/landmass.model';
import { World } from '../calculations/models/world.model';
import { Utility } from '../utils/utility';
import { DialogService } from '../services/dialog.service';
@Component({
  selector: 'app-landmasses',
  templateUrl: './landmasses.component.html',
  styleUrls: ['./landmasses.component.scss']
})
export class LandmassesComponent implements OnInit {

  landmasses: Landmass[] = DataService.world.landmasses;
  addNewLandmass = false;
  newLandmass = '';

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  copyLandmass(lm: Landmass) {
    let newLandmass: Landmass = Utility.getLandmassCopy(lm);
    this.landmasses.push(newLandmass);
  }

  deleteLandmass(landmass: Landmass) {
    this.dialogService.confirm('Are you sure?', 'This will delete the selected landmass.').subscribe(
      res => {
        if (res) {
          this.landmasses = this.landmasses.filter(
            _landmass => _landmass.id !== landmass.id
          );
        }
      }
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

  onDownloadClick() {
    this.downloadJson(this.world);
  }

  downloadJson(myJson: any){
    let sJson = JSON.stringify(myJson);
    let element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', `${this.world.name}_world.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  get world(): World {
    return DataService.world;
  }
}
