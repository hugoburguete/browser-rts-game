import { User } from "../entities/user.entity";
import { DatabaseInsertResponse, Model } from './model';

export interface UserModelInterface {
  create(user: User): Promise<DatabaseInsertResponse<User>>;
  findById(userId: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export default class UserModel extends Model implements UserModelInterface {
  constructor() {
    super();
    this.setDatabase('global');
    this.setCollection('users');
  }

  async create(user: User): Promise<DatabaseInsertResponse<User>> {
    return await this.provider.insertOne(user) as DatabaseInsertResponse<User>;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.provider.findOne({ "username": username });
  }

  async findById(userId: string): Promise<User | null> {
    return await this.provider.findOne({ "_id": userId });
  }

  /**
   * Retrieves a user with a specific email
   *
   * @param email 
   * @returns 
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.provider.findOne({ "email": email });
  }

}