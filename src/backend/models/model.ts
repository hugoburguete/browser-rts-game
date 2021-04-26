import { Collection, MongoClient } from 'mongodb';

export interface ModelInterface { };

export class DatabaseClient extends MongoClient { }

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

export class Model {
  private uri: string = process.env.MONGODB_CONNECTION_STRING || '';
  protected database: string = '';
  protected collection: string = '';

  /**
   * Returns a database client.
   *
   * @returns 
   */
  private getClient(): DatabaseClient {
    return new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  /**
   * Connects to the database client
   *
   * @returns 
   */
  protected connectToClient(): Promise<DatabaseClient> {
    return this.getClient().connect();
  }

  /**
   * Retrieves a database collection.
   * @returns 
   */
  protected getCollection(): Promise<{ client: DatabaseClient, collection: Collection }> {
    return this.connectToClient()
      .then((client) => {
        return {
          client: client,
          collection: client.db(this.database).collection(this.collection)
        }
      });
  }

  /**
   * Closes a database client connection.
   *
   * @returns 
   */
  protected closeConnection(client: DatabaseClient): void {
    client.close();
  }
}