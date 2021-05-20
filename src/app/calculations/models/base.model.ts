export interface BaseCalculationVariables {
    a1?: any;
    f1?: any;
    f2?: any;
    df1?: any;
    df2?: any;
    m1?: any;
    m2?: any;
    ra1?: any;
    ra2?: any;
    fw1?: any;
    fw2?: any;
    dt1?: any;
    dt2?: any;
    ds1?: any;
    ds2?: any;
    fl1?: any;
    fm1?: any;
    tm1?: any;
    mm1?: any;
    fmt1?: any;
    pop1?: any;
}
export interface BaseCalculation {
    variables: BaseCalculationVariables;
    precedanceMap: any;
    f1_calc(): void;
    f2_calc(): void;
    df1_calc(): void;
    df2_calc(): void;
    m1_calc(): void;
    m2_calc(): void;
    ra1_calc(): void;
    ra2_calc(): void;
    fw1_calc(): void;
    fw2_calc(): void;
    dt1_calc(): void;
    dt2_calc(): void;
    ds1_calc(): void;
    ds2_calc(): void;
    performBackgroundCalculations(): void;
    calculateAll(): void;
}