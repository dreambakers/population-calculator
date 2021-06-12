import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { World } from '../calculations/models/world.model';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import { Utility } from '../utils/utility';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNewWorldClick() {
    this.dialogService.inputDialog('New World', 'World Name').subscribe(
      res => {
        if (res) {
          DataService.world = {
            ...DataService.getDefaultWorldObject(),
            name: res,
          };
          this.router.navigate(['/landmasses']);
        }
      }
    );
  }

  onLoadWorldClick() {
    this.dialogService.fileUpload('Load World', 'World File (.json)').subscribe(
      (world: null | World) => {
        if (world) {
          DataService.world = {
            ...world,
            landmasses: [
              ...world.landmasses.map(
                landmass => Utility.getLandmassCopy(landmass)
              )
            ]
          };
          this.router.navigate(['/landmasses']);
        }
      }
    );
  }
}
