import { Collection, MongoClient } from 'mongodb';
import NeDB from "nedb";
import { Entity } from '../../common/entities/entity';

export interface DatabaseInsertResponse<T> {
  /**
   * The model that was inserted
   */
  insertedItem: T;

  /**
   * The count of item that were inserted/updated/retrieved/deleted.
   */
  operationResultCount: number;
}

interface DatabaseInterface {
  database: string;
  collection: string;

  /**
   * Inserts one record to the Database Collection.
   *
   * @param entity The record to insert
   */
  insertOne(entity: Entity): Promise<DatabaseInsertResponse<Entity>>;

  /**
   * Retrieves one record.
   * @todo Make the filter parameter typed.
   *
   * @param filter 
   */
  findOne(filter: any): Promise<any>;
}

class MongoDbClient implements DatabaseInterface {
  private uri: string = process.env.MONGODB_CONNECTION_STRING || '';
  public database: string = '';
  public collection: string = '';

  /**
   * Connects to the database client
   *
   * @returns 
   */
  private connectToClient(): Promise<MongoClient> {
    const client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.connect();
  }

  private async getCollection(client: MongoClient): Promise<Collection> {
    return client.db(this.database).collection(this.collection);
  }

  async insertOne(entity: Entity): Promise<DatabaseInsertResponse<Entity>> {
    const client = await this.connectToClient();
    const collection = await this.getCollection(client);
    const insertResult = await collection.insertOne(entity);
    this.closeConnection(client);

    const insertedItem = insertResult.ops[0];

    return {
      insertedItem: insertedItem,
      operationResultCount: insertResult.insertedCount,
    }
  };

  async findOne(filter: any): Promise<any> {
    const client = await this.connectToClient();
    const collection = await this.getCollection(client);
    const findResult = await collection.findOne(filter);
    this.closeConnection(client);
    return findResult;
  }

  /**
   * Closes a database client connection.
   *
   * @returns 
   */
  private closeConnection(client: MongoClient): void {
    client.close();
  }
}

class NeDBDatabase implements DatabaseInterface {
  database: string = '';
  collection: string = '';

  private getClient(): NeDB {
    const client = new NeDB({ filename: `testing-dbs/${this.database}.${this.collection}.db`, autoload: true });
    return client;
  }

  insertOne(entity: Entity): Promise<DatabaseInsertResponse<Entity>> {
    const client = this.getClient();

    return new Promise((resolve, reject) => {
      client.insert(entity, (err, document) => {
        if (err) reject(err);

        resolve({
          insertedItem: document,
          operationResultCount: 1
        });
      });
    })
  }

  findOne(filter: any): Promise<any> {
    const client = this.getClient();

    return new Promise((resolve, reject) => {
      client.findOne(filter, function (err, doc) {
        if (err) reject(err)

        return resolve(doc);
      });
    });
  }

}

export interface ModelInterface {
};

export abstract class Model implements ModelInterface {
  protected datatabse: string = '';
  protected collection: string = '';
  protected provider: DatabaseInterface;

  constructor() {
    if (process.env.ENV === 'testing') {
      this.provider = new NeDBDatabase();
    } else {
      this.provider = new MongoDbClient();
    }
  }

  protected setDatabase(database: string): void {
    this.provider.database = database;
  }

  protected setCollection(collection: string): void {
    this.provider.collection = collection;
  }
}