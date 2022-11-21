import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import Breadcrumbs from "../../../components/breadcrumbs";
import { getDetailProduct } from "../../../services/product";
import { IProduct } from "../../../type/product";

export const ProductFormDetail: NextPage<{ detail: IProduct }> = ({
  detail,
}) => {
  const breadcrumbsConfig = {
    links: [
      { label: "Products", href: "/" },
      { label: "Detail", href: `/product/detail/${detail._id}` },
      { label: detail.name, href: `/product/detail/${detail._id}` },
    ],
    activeIndex: 2,
  };

  return (
    <>
      <Head>
        <title>Randi | {detail.name}</title>
        <meta name="description" content={detail.description} />
      </Head>

      <Breadcrumbs {...breadcrumbsConfig} />

      <div className="mx-auto lg:w-2/4">
        <form
          action="#"
          method="POST"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
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
                    value={detail.name}
                    readOnly
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
                    value={detail.sku}
                    readOnly
                    required
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={detail.categoryName}
                    readOnly
                    required
                  />
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
                    value={detail.description}
                    readOnly
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
                    value={detail.harga}
                    readOnly
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
                    value={detail.weight}
                    readOnly
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
                    value={detail.width}
                    readOnly
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
                    value={detail.length}
                    readOnly
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
                    value={detail.height}
                    readOnly
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <img src={detail.image} width={200} height={200} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let detail: IProduct;
  let fetchingDetail;

  try {
    fetchingDetail = await getDetailProduct(String(params?.id));
  } catch (error) {
    return {
      notFound: true,
    };
  }

  if (fetchingDetail.status !== 200) {
    return {
      notFound: true,
    };
  }

  detail = fetchingDetail.data;

  return {
    props: {
      detail,
    },
  };
};

export default ProductFormDetail;
