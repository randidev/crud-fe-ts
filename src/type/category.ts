export interface ICategory {
  _id: string;
  id: number;
  name: string;
}

export interface ICategoryList extends Array<ICategory> {}
