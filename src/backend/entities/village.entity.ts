import { Smithy, Headquarters, Barracks, Stable, TimberCamp, ClayPit, IronMine, Warehouse } from "../../common/entities/building.entity";
import { CoordinateInterface, Coordinate } from "../../common/entities/Coordinate";
import { Entity } from '../../common/entities/entity';
import { Resource } from '../../common/entities/resource.entity';

/**
 * A village not owned by the user requesting it.
 */
export interface SimpleVillage extends Entity {
  userId: string,
  coordinates: CoordinateInterface
}

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

export const serializeVillage = (village: Village): Village => {
  village.userId = village.userId.toString();
  return village;
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