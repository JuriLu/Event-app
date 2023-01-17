import {UserModel} from "./user.model";

export type Status = 'private' | 'public'
export interface EventModel {
  id: number;
  title: string;
  start: string;
  end: string;
  status: Status;
  user?: UserModel;
  bookings?: UserModel[]
}
