export interface UserModel{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  token?: string;
  role?: number;
}
