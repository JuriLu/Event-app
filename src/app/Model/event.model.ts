import {UserModel} from "./user.model";

export type status = 'Private' | 'Public'
export interface EventModel {
  id: number;
  title: string;
  start: string;
  end: string;
  user?: UserModel;
  status?: status;
  bookings?: UserModel[]
}
