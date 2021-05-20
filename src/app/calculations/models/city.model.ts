export interface CityCalculationVariables {
    rr1?: any;
    rr2?: any;
    rr3?: any;
    rr4?: any;
    rr5?: any;
    rr6?: any;
    rr7?: any;
    rp1?: any;
    rp2?: any;
    rp3?: any;
    rp4?: any;
    rp5?: any;
    rp6?: any;
    rp7?: any;

    ur1?: any;
    ur2?: any;
    ur3?: any;
    ur4?: any;
    ur5?: any;
    ur6?: any;
    ur7?: any;
    up1?: any;
    up2?: any;
    up3?: any;
    up4?: any;
    up5?: any;
    up6?: any;
    up7?: any;

    cp1?: any;
    cp2?: any;
    cp3?: any;
    cp4?: any;
    cp5?: any;
    cp6?: any;
    cp7?: any;
    cp8?: any;
    cp9?: any;
    cp10?: any;
    cp11?: any;
    cp12?: any;
    cp13?: any;
    cp14?: any;
}

export interface LandmassCityCalculation {
    variables: CityCalculationVariables;
}

export interface NationCityCalculation {
    id: string;
    variables: CityCalculationVariables;
}

export interface CityCalculationFunctions {
    cp1_calc(p3: number): void;
    cp2_calc(p3: number): void;
    cp3_calc(p3: number): void;
    cp4_calc(p3: number): void;
    cp5_calc(p3: number): void;
    cp6_calc(p3: number): void;
    cp7_calc(p3: number): void;
    cp8_calc(p3: number): void;
    cp9_calc(p3: number): void;
    cp10_calc(p3: number): void;
    cp11_calc(p3: number): void;
    cp12_calc(p3: number): void;
    cp13_calc(p3: number): void;
    cp14_calc(p3: number): void;
    calculateAll(p3: number): void;
}

export interface CityCalculation extends CityCalculationFunctions {
    selectedPopulation: 'nation' | 'landmass';
    selectedCalculation: 'rural' | 'urban';
    nationCityCalculation: [NationCityCalculation?];
    landmassCityCalculation: LandmassCityCalculation;
    selectedCalculationObj?: NationCityCalculation | LandmassCityCalculation;
}