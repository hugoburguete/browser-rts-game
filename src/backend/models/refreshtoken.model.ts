import { ObjectId } from 'bson';
import { RefreshToken, User } from "../entities/user.entity";
import { DatabaseInsertResponse, DatabaseUpdateResponse, Model } from './model';

export interface RefreshTokenModelInterface {
  /**
   * Creates a database record of a refresh token.
   *
   * @param token 
   */
  create(token: RefreshToken): Promise<DatabaseInsertResponse<RefreshToken>>;

  /**
   * Creates or updates a refresh token database record.
   * @param token 
   */
  createOrUpdate(token: RefreshToken): Promise<DatabaseInsertResponse<RefreshToken> | DatabaseUpdateResponse>;

  /**
   * Retrieves a token record
   *
   * @param token 
   */
  findByToken(token: string): Promise<RefreshToken | null>;

  /**
   * Retrieves a token record by user Id
   *
   * @param userId 
   */
  findByUserId(userId: string): Promise<RefreshToken | null>;

  /**
   * Updates a token record.
   *
   * @param token 
   */
  update(token: RefreshToken): Promise<DatabaseUpdateResponse>;
}

export default class RefreshTokenModel extends Model implements RefreshTokenModelInterface {
  constructor() {
    super();
    this.setDatabase('global');
    this.setCollection('refresh_tokens');
  }

  async create(token: RefreshToken): Promise<DatabaseInsertResponse<RefreshToken>> {
    return await this.provider.insertOne(token) as DatabaseInsertResponse<RefreshToken>;
  }

  async createOrUpdate(token: RefreshToken): Promise<DatabaseInsertResponse<RefreshToken> | DatabaseUpdateResponse> {
    const existingToken = await this.findByUserId(token.userId);
    if (existingToken) {
      existingToken.replacedByToken = existingToken.token;
      existingToken.token = token.token;
      existingToken.expires = token.expires;
      existingToken.revoked = token.created;
      existingToken.revokedByIp = token.createdByIp;
      return await this.update(existingToken);
    } else {
      return await this.provider.insertOne(token) as DatabaseInsertResponse<RefreshToken>;
    }
  }

  async findByToken(token: string): Promise<RefreshToken> {
    return await this.provider.findOne({ 'token': token });
  }

  async findByUserId(userId: string): Promise<RefreshToken> {
    return await this.provider.findOne({ 'userId': new ObjectId(userId) });
  }

  async update(token: RefreshToken): Promise<DatabaseUpdateResponse> {
    return await this.provider.updateOne({ '_id': new ObjectId(token._id) }, token) as DatabaseUpdateResponse;
  }
}