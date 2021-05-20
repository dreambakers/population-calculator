export interface DynamicDemographicChart {
    editing?: boolean;
    name: string;
    percentage: any;
}
export interface SimpleAndPiechartDemographicsVariables {
    pcd?: any;
    mp1?: any;
    mp2?: any;
    mp3?: any;
    classLevelsPerPopulation: {
        wp?: any;
        mc?: any;
        pp?: any;
        sp?: any;
    };
    educationPerPopulation: {
        we?: any;
        me?: any;
        ir?: any;
    };
    ethnicityPerPopulation: DynamicDemographicChart[];
    culturePerPopulation: DynamicDemographicChart[];
    religionPerPopulation: DynamicDemographicChart[];
    racePerPopulation: DynamicDemographicChart[];
    languagePerPopulation: DynamicDemographicChart[];
    politicalAffliationsPerPopulation: DynamicDemographicChart[];
}

export interface LandmassPopulationDemographics {
    variables: SimpleAndPiechartDemographicsVariables;
}

export interface NationPopulationDemographics {
    id: string;
    variables: SimpleAndPiechartDemographicsVariables;
}

export interface SimpleAndPiechartDemographics {
    selectedPopulation: 'nation' | 'landmass';
    nationPopulationDemographics: [NationPopulationDemographics?];
    landmassPopulationDemographics: LandmassPopulationDemographics;
}