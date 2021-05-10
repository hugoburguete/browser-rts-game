import { Entity } from './entity';

export interface Building extends Entity {
  level: number;
}

export interface ResourceBuilding extends Building { }

export interface Headquarters extends Building { }

export interface Barracks extends Building { }

export interface Smithy extends Building { }

export interface Stable extends Building { }

export interface Warehouse extends Building { }

export interface TimberCamp extends ResourceBuilding { }

export interface ClayPit extends ResourceBuilding { }

export interface IronMine extends ResourceBuilding { }

export interface BuildingTask extends Entity {
  _id?: string;
  village_id: string;
  building_name: string;
  from_level: number;
  to_level: number;
  created_at: Date;
  ends_at: Date;
}