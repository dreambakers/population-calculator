import { Component, OnInit } from '@angular/core';
import { DataService, Nation, NationCalculationVariables, PopulationCalculation } from 'src/app/services/data.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-population-calculation',
  templateUrl: './population-calculation.component.html',
  styleUrls: ['./population-calculation.component.scss']
})
export class PopulationCalculationComponent implements OnInit {

  populationCalculation: PopulationCalculation = DataService.world.landmasses[0].populationCalculation;
  addNewNation = false;
  newNation = '';

  constructor() { }

  ngOnInit(): void {
  }

  addNation() {
    if (this.addNewNation) {
      this.populationCalculation.nations.push(DataService.getDefaultNationObject());
      this.newNation = '';
    }
    this.addNewNation = !this.addNewNation;
  }

  copyNation(nation: Nation) {
    this.populationCalculation.nations.push({
      ...nation,
      id: uuid()
    });
  }

  deleteNation(nation: Nation) {
    this.populationCalculation.nations = this.populationCalculation.nations.filter(
      _nation => _nation.id !== nation.id
    );
  }

  onCountrySizeUpdate(newVal: string, nation: Nation) {
    if (nation.countrySizeCalculationPreference === 'area') {
      nation.variables.cs1 = +newVal;
      nation.cs2_calc(DataService.world.landmasses[0].baseCalculation.variables.a1);
    } else {
      nation.variables.cs2 = +newVal;
      nation.cs1_calc(DataService.world.landmasses[0].baseCalculation.variables.a1);
    }
  }

  onTableValueUpdate(nation: Nation) {
    nation.ey2_calc();
    nation.ey3_calc();
    nation.ey4_calc();

    nation.ad2_calc();
    nation.ad3_calc();
    nation.ad4_calc();

    nation.ch2_calc();
    nation.ch3_calc();
    nation.ch4_calc();
  }

  updateTTM(nation: Nation) {
    nation.ttm_calc();
  }
}
