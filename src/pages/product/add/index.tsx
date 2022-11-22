import axios from "axios";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getCategories } from "../../../services/categories";
import { ICategoryList } from "../../../type/category";
import { IFormValue } from "./type";

import Breadcrumbs from "../../../components/breadcrumbs";

const breadcrumbsConfig = {
  links: [
    { label: "Products", href: "/" },
    { label: "Add New", href: "/product/add" },
  ],
  activeIndex: 1,
};

export const ProductForm: NextPage<{ categories: ICategoryList }> = ({
  categories,
}) => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formValue, setFormValue] = useState<IFormValue>({
    name: "",
    sku: "",
    CategoryId: 1,
    categoryName: "Cemilan",
    description: "",
    weight: 0,
    width: 0,
    length: 0,
    height: 0,
    image: [],
    harga: 0,
  });

  const handleSubmit = async () => {
    // upload the image first
    const body = new FormData();
    body.set("image", formValue.image[0]);
    const uploadImage = await axios.post("/api/product/upload-image", body);

    if (uploadImage.status !== 200)
      toast.error("Failed when uploading image.", {
        position: "bottom-center",
      });

    const dataToPost = { ...formValue };
    dataToPost.image = dataToPost.image[0].name;

    const uploading = await axios.post("/api/product/add-product", dataToPost);

    if (uploading.status !== 200)
      toast.error("Failed when adding new product.", {
        position: "bottom-center",
      });

    toast.success("Successfully add new product.", {
      position: "bottom-center",
    });

    // if add product success, then redirect to product list with the callback params
    // to indicates that we need to hit API again to refresh the product
    setTimeout(() => {
      router.push("/?callbackFromAddProduct=true");
    }, 1000);
  };

  const handlePreview = () => {
    const [file] = formValue.image;
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (formValue.image.length > 0) {
      handlePreview();
    }
  }, [formValue.image]);

  return (
    <>
      <Breadcrumbs {...breadcrumbsConfig} />

      <div className="mx-auto lg:w-2/4">
        <form
          action="#"
          method="POST"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="product-name"
                    className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formValue.name}
                    onChange={(e) =>
                      setFormValue({ ...formValue, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formValue.sku}
                    onChange={(e) =>
                      setFormValue({ ...formValue, sku: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    required
                    value={formValue.CategoryId}
                    onChange={(e) => {
                      setFormValue({
                        ...formValue,
                        CategoryId: e.target.value,
                        categoryName:
                          e.target.options[e.target.selectedIndex].innerHTML,
                      });
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    {categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={10}
                    required
                    value={formValue.description}
                    onChange={(e) =>
                      setFormValue({
                        ...formValue,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    id="price"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formValue.harga}
                    onChange={(e) =>
                      setFormValue({ ...formValue, harga: +e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700">
                    Weight
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="weight"
                    id="weight"
                    autoComplete="address-level2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formValue.weight}
                    onChange={(e) =>
                      setFormValue({ ...formValue, weight: +e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                  <label
                    htmlFor="width"
                    className="block text-sm font-medium text-gray-700">
                    Width
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="width"
                    id="width"
                    autoComplete="address-level1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formValue.width}
                    onChange={(e) =>
                      setFormValue({ ...formValue, width: +e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700">
                    Length
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="length"
                    id="length"
                    autoComplete="length"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formValue.length}
                    onChange={(e) =>
                      setFormValue({ ...formValue, length: +e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700">
                    Height
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="height"
                    id="height"
                    autoComplete="height"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formValue.height}
                    onChange={(e) =>
                      setFormValue({ ...formValue, height: +e.target.value })
                    }
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  {previewImage !== "" && (
                    <img src={previewImage} width={200} height={200} />
                  )}
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="image"
                    id="image"
                    className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    onChange={(e) =>
                      setFormValue({ ...formValue, image: e.target.files })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let categories: ICategoryList;

  const fetchingCategories = await getCategories();

  if (fetchingCategories.status !== 200) {
    categories = [];
  }

  categories = fetchingCategories.data;

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};

export default ProductForm;
