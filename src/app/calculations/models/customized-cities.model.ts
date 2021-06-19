export interface CustomizedCityVariables {
    ccsdc?: any;
    ccdc?: any;
    ccsc?: any;
    ccssc?: any;

    ccsdcp?: any;
    ccdcp?: any;
    ccscp?: any;
    ccsscp?: any;

    usdc?: any;
    udc?: any;
    usc?: any;
    ussc?: any;

    usdcp?: any;
    udcp?: any;
    uscp?: any;
    usscp?: any;

    msdc?: any;
    mdc?: any;
    msc?: any;
    mssc?: any;

    msdcp?: any;
    mdcp?: any;
    mscp?: any;
    msscp?: any;

    pic?: any;
    cip?: any;
    cia?: any;
    urp?: any;
    ura?: any;
    mep?: any;
    mea?: any;
}

export interface CustomizedCity {
    id: string;
    editing?: boolean;
    type: 'super_dense' | 'dense' | 'sparse' | 'super_sparse';
    variables: CustomizedCityVariables;
    expanded: boolean;
    cip_calc(): void;
    cia_calc(): void;
    urp_calc(): void;
    ura_calc(): void;
    mep_calc(): void;
    mea_calc(): void;
    calculateAll(): void;
}

export interface CustomizedCityCalculation {
    cites: CustomizedCity[];
}