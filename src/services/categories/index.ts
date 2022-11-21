import serviceInstance from "../../config/instance";

export const getCategories = async () => {
  return await serviceInstance({
    url: `/categories`,
    method: "GET",
  });
};
