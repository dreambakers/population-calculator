import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

export interface Landmass {
  name: string;
  editing?: boolean;
  id: string;
}

export interface World {
  name: string;
  landmasses: Landmass[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static world: World = { name: 'test', landmasses: [{name: 'test', id: uuid()}] };
  constructor() { }
}
