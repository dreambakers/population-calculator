export interface CustomizedCityVariables {
    twc1?: any;
    ccpt?: any;
    ccpw?: any;
    twc2?: any;
    upt?: any;
    upw?: any;
    twc3?: any;
    mpt?: any;
    mpw?: any;

    pic?: any;
    ccp?: any;
    cca?: any;
    up?: any;
    ua?: any;
    mp?: any;
    ma?: any;
}

export interface CustomizedCity {
    type: 'tall' | 'wide';
    variables: CustomizedCityVariables;
    expanded: boolean;
    ccp_calc(): void;
    cca_calc(): void;
    up_calc(): void;
    ua_calc(): void;
    mp_calc(): void;
    ma_calc(): void;
}

export interface CustomizedCityCalculation {
    cites: CustomizedCity[];
}