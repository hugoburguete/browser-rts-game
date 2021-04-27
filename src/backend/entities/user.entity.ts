import { User as CommonUser } from "../../common/entities/user.entity";

export interface User extends CommonUser {
  _id?: string;
}