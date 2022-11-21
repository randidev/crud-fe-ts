import serviceInstance from "../../config/instance";
import { IFormValue } from "../../pages/product/add/type";

export const getProducts = async () => {
  return await serviceInstance({
    url: `/products`,
    method: "GET",
  });
};

export const deleteProduct = async (id: string) => {
  return await serviceInstance({
    url: `/products/${id}`,
    method: "DELETE",
  });
};

export const addProduct = async (payload: IFormValue) => {
  return await serviceInstance({
    url: `/products/`,
    method: "POST",
    data: payload,
  });
};
