import { Village as CommonVillage, createVillage as createCommonVillage, VillageResponse } from "../../common/entities/village.entity";
import { CoordinateInterface, Coordinate } from "../../common/entities/Coordinate";
import { Entity } from '../../common/entities/entity';
import { getMaxWarehouseResourcesPerLevel } from './building.entity';

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
export interface Village extends CommonVillage { }

export const serializeVillage = (village: Village): VillageResponse => {
  const maxWarehouseCapacity = getMaxWarehouseResourcesPerLevel(village.buildings.warehouse.level);
  const additionalInfo = {
    userId: village.userId.toString(),
    resources: {
      wood: {
        ...village.resources.wood,
        quantity: village.resources.wood.quantity,
        maximum: maxWarehouseCapacity
      },
      clay: {
        ...village.resources.clay,
        maximum: maxWarehouseCapacity
      },
      iron: {
        ...village.resources.iron,
        maximum: maxWarehouseCapacity
      },
      population: {
        ...village.resources.population,
        maximum: maxWarehouseCapacity
      }
    }
  };

  return { ...village, ...additionalInfo };
}

export const createVillage = (userId: string): Village => {
  return createCommonVillage(userId);
}