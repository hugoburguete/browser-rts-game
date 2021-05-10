import { ObjectId } from 'bson';
import { BuildingTask } from "../entities/building.entity";
import { DatabaseInsertResponse, Model } from './model';

export interface BuildingTaskModelInterface {
  /**
   * Creates a new building task
   *
   * @param buildingTask 
   */
  create(buildingTask: BuildingTask): Promise<DatabaseInsertResponse<BuildingTask>>;

  /**
   * Retrieves a building task by ID.
   *
   * @param id 
   */
  findById(id: string): Promise<BuildingTask | null>;

  /**
   * Retrieves all building tasks for a specific village
   */
  findByVillageId(villageId: string): Promise<BuildingTask | null>;
}

export default class BuildingTaskModel extends Model implements BuildingTaskModelInterface {
  constructor() {
    super();
    this.setDatabase('w_1');
    this.setCollection('building_tasks');
  }

  async create(buildingTask: BuildingTask): Promise<DatabaseInsertResponse<BuildingTask>> {
    return await this.provider.insertOne(buildingTask) as DatabaseInsertResponse<BuildingTask>;
  }

  async findById(id: string): Promise<BuildingTask> {
    return await this.provider.findOne({ id: new ObjectId(id) });
  }

  async findByVillageId(villageId: string): Promise<BuildingTask> {
    return await this.provider.findOne({ village_id: new ObjectId(villageId) });
  }

}