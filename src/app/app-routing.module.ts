import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandmassesComponent } from './landmasses/landmasses.component';

const routes: Routes = [
  { path: '', redirectTo: 'landmasses', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'landmasses', component: LandmassesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
