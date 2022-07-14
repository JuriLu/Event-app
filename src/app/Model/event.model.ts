import {UserModel} from "./user.model";

export interface EventModel {
  id: number;
  title: string;
  start: string;
  end: string;
  user?: UserModel;
  bookCount?: number;
  bookings?: UserModel[]
}
