export interface NationCalculationVariables {
    totalPopulation?: any;
    npd1?: any;
    npd2?: any;
    cs1?: any;
    cs2?: any;
    cs3?: any;
    cs4?: any;
    popd?: any;
    p1?: any;
    p2?: any;
    p3?: any;
    m?: any;
    f?: any;
    ey1?: any;
    ey2?: any;
    ey3?: any;
    ey4?: any;
    ad1?: any;
    ad2?: any;
    ad3?: any;
    ad4?: any;
    ch1?: any;
    ch2?: any;
    ch3?: any;
    ch4?: any;
    ca?: any;
    it?: any;
    et?: any;
    ttm?: any;
    maleArmySize?: any;
    femaleArmySize?: any;
    mixedArmySize?: any;
}
export interface Nation {
    name: string;
    id: string;
    variables: NationCalculationVariables;
    editing?: boolean;
    type: 'nation';
    cs1_calc(area: any): void;
    cs2_calc(area: any): void;
    ey2_calc(): void;
    ey3_calc(): void;
    ey4_calc(): void;
    ad2_calc(): void;
    ad3_calc(): void;
    ad4_calc(): void;
    ch2_calc(): void;
    ch3_calc(): void;
    ch4_calc(): void;
    ttm_calc(): void;
    popd_calc(): void;
    npd2_calc(pop1: number): void;
    p2_calc(): void;
    p3_calc(): void;
    maleArmySize_calc(): void;
    femaleArmySize_calc(): void;
    mixedArmySize_calc(): void;
    expanded: boolean;
}
export interface PopulationCalculation {
    nations: Nation[];
}