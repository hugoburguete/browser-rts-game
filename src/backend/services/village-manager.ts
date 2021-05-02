import { Village } from '../entities/village.entity';
import { getResouceRateForLevel } from "../entities/building.entity";
import { ResourceBuilding } from '../../common/entities/building.entity';

export const updateVillage = (village: Village) => {
  const timeInMillis = (new Date()).getTime();

  village.resources.wood.quantity = village.resources.wood.quantity + getResourcesEarnedForTimePeriod(village.buildings.timberCamp, timeInMillis - village.last_updated);
  village.resources.clay.quantity = village.resources.clay.quantity + getResourcesEarnedForTimePeriod(village.buildings.clayPit, timeInMillis - village.last_updated);
  village.resources.iron.quantity = village.resources.iron.quantity + getResourcesEarnedForTimePeriod(village.buildings.ironMine, timeInMillis - village.last_updated);

  village.last_updated = timeInMillis;
  return village;
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