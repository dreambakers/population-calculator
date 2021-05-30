import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationsComponent } from './calculations/calculations.component';
import { HomeComponent } from './home/home.component';
import { LandmassesComponent } from './landmasses/landmasses.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'landmasses', component: LandmassesComponent },
  { path: 'calculations/:id', component: CalculationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
