import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';

import { DigitOnlyModule } from '@uiowa/digit-only';

import { BaseCalculationComponent } from './calculations/base-calculation/base-calculation.component';
import { LandmassesComponent } from './landmasses/landmasses.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './dialogs/input/input.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { PopulationCalculationComponent } from './calculations/population-calculation/population-calculation.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseCalculationComponent,
    LandmassesComponent,
    HomeComponent,
    InputComponent,
    CalculationsComponent,
    PopulationCalculationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    DigitOnlyModule,
    MatTooltipModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
