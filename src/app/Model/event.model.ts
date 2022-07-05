import {UserModel} from "./user.model";

export interface EventModel {
  id: number;
  title: string;
  start: string;
  end: string;
  bookCount?: number;
  bookings?: UserModel[]
}
