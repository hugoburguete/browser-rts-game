import { Village } from "../entities/village.entity";
import { DatabaseInsertResponse, Model } from './model';

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

}