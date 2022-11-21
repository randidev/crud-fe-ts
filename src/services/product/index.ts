import serviceInstance from "../../config/instance";

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
