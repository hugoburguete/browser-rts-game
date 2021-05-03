import { Smithy, Headquarters, Barracks, Stable, TimberCamp, ClayPit, IronMine, Warehouse } from "./building.entity";
import { CoordinateInterface, Coordinate } from "./Coordinate";
import { Entity } from './entity';
import { Resource, ResourceWithCap } from './resource.entity';

/**
 * Village
 */
export interface Village extends Entity {
  _id?: string,

  /**
   * The user this village belongs to
   */
  userId: string,

  /**
   * The last time the village was updated in milliseconds
   */
  last_updated: number,

  /**
   * The villages resources
   */
  resources: {
    wood: Resource,
    clay: Resource,
    iron: Resource,
    population: Resource,
  },

  /**
   * The location of the village
   */
  coordinates: CoordinateInterface,

  /**
   * The buildings of the village
   */
  buildings: {
    headquarters: Headquarters,
    barracks: Barracks,
    stable: Stable,
    smithy: Smithy,
    warehouse: Warehouse,
    timberCamp: TimberCamp,
    clayPit: ClayPit,
    ironMine: IronMine
  }
}

export interface VillageResponse extends Village {
  resources: {
    wood: ResourceWithCap,
    clay: ResourceWithCap,
    iron: ResourceWithCap,
    population: ResourceWithCap,
  },
}

export const createVillage = (userId: string): Village => {
  return {
    userId: userId,
    last_updated: (new Date()).getTime(),
    resources: {
      wood: {
        quantity: 250,
      },
      clay: {
        quantity: 250,
      },
      iron: {
        quantity: 250,
      },
      population: {
        quantity: 250,
      }
    },
    coordinates: new Coordinate(),
    buildings: {
      headquarters: {
        level: 1,
      },
      barracks: {
        level: 1,
      },
      stable: {
        level: 1,
      },
      smithy: {
        level: 1,
      },
      warehouse: {
        level: 1
      },
      timberCamp: {
        level: 1,
      },
      clayPit: {
        level: 1,
      },
      ironMine: {
        level: 1,
      }
    }
  }
}


export const createVillageResponse = (userId: string): VillageResponse => {
  const village = createVillage(userId);
  const additionalInfo = {
    resources: {
      wood: {
        ...village.resources.wood,
        maximum: 1000
      },
      clay: {
        ...village.resources.clay,
        maximum: 1000
      },
      iron: {
        ...village.resources.iron,
        maximum: 1000
      },
      population: {
        ...village.resources.population,
        maximum: 1000
      },
    }
  }

  return { ...village, ...additionalInfo }
}