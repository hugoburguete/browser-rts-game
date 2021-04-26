import { Entity } from './entity';

export interface User extends Entity {
  _id?: string;
  email: string;
  username: string;
}