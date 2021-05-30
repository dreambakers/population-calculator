import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Landmass } from './models/landmass.model';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    if (this.route.snapshot.params.id) {
      DataService.world.selectedLandmass = this.route.snapshot.params.id;
    }
  }

  ngOnInit(): void {
  }

  get selectedLandmass(): Landmass {
    return DataService.getSelectedLandmass();
  }
}
