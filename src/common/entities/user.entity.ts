import { Entity } from './entity';

export interface User extends Entity {
  email: string;
  username: string;
  password: string;
}