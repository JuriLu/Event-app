import {ListOf} from "./list-of.model";

export interface PageOf<MODEL> extends ListOf<MODEL> {
  pageNo: number;
  pageSize: number;
}
