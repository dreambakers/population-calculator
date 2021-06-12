import { CustomizedCity } from "../calculations/models/customized-cities.model";
import { Landmass } from "../calculations/models/landmass.model";
import { Nation } from "../calculations/models/population.model";
import { DataService } from "../services/data.service";
import { v4 as uuid } from 'uuid';

export class Utility {
  public static ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
    return argument;
  }

  public static getLandmassCopy(lm: Landmass) {
    // Making a deep copy without the object functions. Otherwise, new object gets functions of old reference
    let landmass: Landmass = JSON.parse(JSON.stringify(lm));

    const getNations = (nations: Nation[]): Nation[] => {
      return nations.map(nation => {
        return {
          ...DataService.getDefaultNationObject(),
          ...nation
        }
      });
    }

    const getCustomizedCities = (cities: CustomizedCity[]): CustomizedCity[] => {
      return cities.map(city => {
        return {
          ...DataService.getDefaultCustomizedCityObject(),
          ...city
        }
      });
    }

    const newLandmass: Landmass = {
      id: uuid(),
      name: landmass.name,
      type: 'landmass',
      baseCalculation: {
        ...DataService.getDefaultBaseCalculationsObject(),
        ...landmass.baseCalculation
      },
      populationCalculation: {
        nations: getNations(landmass.populationCalculation.nations)
      },
      simpleAndPiechartDemographics: landmass.simpleAndPiechartDemographics,
      cityCalculation: {
        ...DataService.getDefaultCityCalculationObject(),
        ...landmass.cityCalculation
      },
      customizedCityCalculation: {
        cites: getCustomizedCities(landmass.customizedCityCalculation.cites)
      }
    }
    return newLandmass;
  }
}
