import { User } from "../entities/user.entity";
import { DatabaseInsertResponse, Model } from './model';

export interface UserModelInterface {
  create(user: User): Promise<DatabaseInsertResponse<User>>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export default class UserModel extends Model implements UserModelInterface {
  database = 'global';
  collection = 'users';

  async create(user: User): Promise<DatabaseInsertResponse<User>> {
    return await this.getCollection()
      .then(async ({ client, collection }) => {
        const insertResult = await collection.insertOne(user);
        this.closeConnection(client);

        return insertResult;
      })
      .then((result) => {
        const insertedItem = result.ops[0];

        return {
          insertedItem: <User>insertedItem,
          operationResultCount: result.insertedCount,
        }
      });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.getCollection()
      .then(async ({ client, collection }) => {
        const findResult = await collection.findOne({ "username": username });
        this.closeConnection(client);

        return findResult;
      })
      .then((result) => {
        return result;
      });
  }

  /**
   * Retrieves a user with a specific email
   *
   * @param email 
   * @returns 
   */
  async findByEmail(email: string): Promise<User> {
    return await this.getCollection()
      .then(async ({ client, collection }) => {
        const findResult = await collection.findOne({ "email": email });
        this.closeConnection(client);

        return findResult;
      })
      .then((result) => {
        return result;
      })
  }

}