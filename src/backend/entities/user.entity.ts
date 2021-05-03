import { User as CommonUser } from "../../common/entities/user.entity";

export interface User extends CommonUser {
  _id?: string;
}

export interface RefreshToken {
  _id?: string,
  userId: string,
  token: string,
  expires: Date,
  created: Date,
  createdByIp: string,
  revoked?: Date,
  revokedByIp?: string,
  replacedByToken?: string
}