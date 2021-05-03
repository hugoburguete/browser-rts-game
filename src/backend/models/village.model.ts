import { Village } from "../entities/village.entity";
import { DatabaseInsertResponse, DatabaseUpdateResponse, Model } from './model';

export interface VillageModelInterface {
  /**
   * Creates a new village record
   *
   * @param village 
   */
  create(village: Village): Promise<DatabaseInsertResponse<Village>>;

  /**
   * Retrieves the village record for a specific user.
   *
   * @param userId 
   */
  findByUserId(userId: string): Promise<Village>;

  updateById(villageId: string, villageData: any): Promise<DatabaseUpdateResponse>;
}

export class VillageModel extends Model implements VillageModelInterface {
  constructor(world: string) {
    super();
    this.setDatabase(`w_${world}`);
    this.setCollection('villages');
  }

  async create(village: Village): Promise<DatabaseInsertResponse<Village>> {
    return await this.provider.insertOne(village) as DatabaseInsertResponse<Village>;
  }

  async findByUserId(userId: string): Promise<Village> {
    return await this.provider.findOne({ userId: userId });
  }

  async updateById(villageId: string, villageData: any): Promise<DatabaseUpdateResponse> {
    return await this.provider.updateOne({ '_id': villageId }, villageData);
  }
}