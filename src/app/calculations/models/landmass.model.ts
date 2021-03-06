import { BaseCalculation } from "./base.model";
import { CityCalculation } from "./city.model";
import { CustomizedCityCalculation } from "./customized-cities.model";
import { PopulationCalculation } from "./population.model";
import { SimpleAndPiechartDemographics } from "./simple-and-piechart-demographics.model";

export interface Landmass {
    name: string;
    editing?: boolean;
    id: string;
    baseCalculation: BaseCalculation;
    populationCalculation: PopulationCalculation;
    simpleAndPiechartDemographics: SimpleAndPiechartDemographics;
    cityCalculation: CityCalculation;
    customizedCityCalculation: CustomizedCityCalculation
    type: 'landmass';
}