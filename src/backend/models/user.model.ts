import { User } from "../entities/user.entity";
import { DatabaseInsertResponse, Model } from './model';

export interface UserModelInterface {
  create(user: User): Promise<DatabaseInsertResponse<User>>;
  findById(userId: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
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

  async findByUsername(username: string): Promise<User | null> {
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

  async findById(userId: string): Promise<User | null> {
    return await this.getCollection()
      .then(async ({ client, collection }) => {
        const findResult = await collection.findOne({ "_id": userId });
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
  async findByEmail(email: string): Promise<User | null> {
    return await this.getCollection()
      .then(async ({ client, collection }) => {
        const findResult = await collection.findOne({ "email": email });
        this.closeConnection(client);

        return findResult;
      })
      .then((result) => {
        if (!result) {
          return null;
        }
        return result;
      })
  }

}