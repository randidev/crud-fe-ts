export interface IProduct {
  _id: string;
  id?: number;
  CategoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  harga: number;
}

export interface IProductList extends Array<IProduct> {}
