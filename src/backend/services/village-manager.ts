import { Village } from '../entities/village.entity';
import { getMaxWarehouseResourcesPerLevel, getResouceRateForLevel } from "../entities/building.entity";
import { ResourceBuilding } from '../../common/entities/building.entity';

export const updateVillage = (village: Village) => {
  const timeInMillis = (new Date()).getTime();

  const villageUpdates = {
    last_updated: timeInMillis,
    resources: {
      wood: { quantity: village.resources.wood.quantity },
      clay: { quantity: village.resources.clay.quantity },
      iron: { quantity: village.resources.iron.quantity },
      population: { quantity: village.resources.population.quantity },
    }
  };

  // Update Resources
  const maxWarehouseCapacity = getMaxWarehouseResourcesPerLevel(village.buildings.warehouse.level);
  if (village.resources.wood.quantity <= maxWarehouseCapacity) {
    const woodQuantity = village.resources.wood.quantity + getResourcesEarnedForTimePeriod(village.buildings.timberCamp, timeInMillis - village.last_updated);
    villageUpdates.resources.wood.quantity = Math.min(woodQuantity, maxWarehouseCapacity);
  }

  if (village.resources.clay.quantity <= maxWarehouseCapacity) {
    const clayQuantity = village.resources.clay.quantity + getResourcesEarnedForTimePeriod(village.buildings.clayPit, timeInMillis - village.last_updated);
    villageUpdates.resources.clay.quantity = Math.min(clayQuantity, maxWarehouseCapacity);
  }

  if (village.resources.iron.quantity <= maxWarehouseCapacity) {
    const ironQuantity = village.resources.iron.quantity + getResourcesEarnedForTimePeriod(village.buildings.ironMine, timeInMillis - village.last_updated);
    villageUpdates.resources.iron.quantity = Math.min(ironQuantity, maxWarehouseCapacity);
  }

  const merged = { ...village, ...villageUpdates };
  return {
    updatedVillage: merged,
    updates: villageUpdates
  };
}

/**
 * Retrieves the resources earned within a time period.
 *
 * @param resourceBuilding The building mining the resource
 * @param timePeriod The time period in milliseconds
 * @returns The resources earned within that period
 */
const getResourcesEarnedForTimePeriod = (resourceBuilding: ResourceBuilding, timePeriod: number) => {
  const resourcePerLevel = getResouceRateForLevel(resourceBuilding.level);
  const resourcePerMillisecond = resourcePerLevel / (60 * 60 * 1000);

  return resourcePerMillisecond * timePeriod;
}