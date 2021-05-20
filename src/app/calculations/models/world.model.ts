import { Landmass } from "./landmass.model";

export interface World {
    name: string;
    landmasses: Landmass[];
    selectedLandmass?: string;
}