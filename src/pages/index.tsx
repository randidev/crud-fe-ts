import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CgTrashEmpty } from "react-icons/cg";
import { AiOutlineCloudSync, AiOutlineEye } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import moment from "moment";
import Swal from "sweetalert2";

import { deleteProduct, getProducts } from "../services/product";
import { IProductList, IProduct } from "../type/product";
import { currencyFormat } from "../utils/helpers";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { replace } from "../features/products";
import { confirmationConfig } from "../config/lib/swal";

import Table from "../components/table";
import Card from "../components/card";
import Breadcrumbs from "../components/breadcrumbs";
import Loading from "../components/loading";
import Button from "../components/button";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { callbackFromAddProduct = false } = router.query;

  const cachedProduct = useAppSelector((state) => state.products);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProductList>(cachedProduct.data);
  const columns = useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        header: "SKU",
        accessorKey: "sku",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Category",
        accessorKey: "categoryName",
      },
      {
        header: "Price",
        cell: (props) => {
          const price = props.row.original.harga;
          return currencyFormat("idr", price);
        },
      },
      {
        accessorKey: "width",
        header: "Width",
      },
      {
        accessorKey: "length",
        header: "Length",
      },
      {
        accessorKey: "height",
        header: "Height",
      },
      {
        accessorKey: "weight",
        header: "Weight",
      },
      {
        header: "Image",
        cell: (props) => {
          const sku = props.row.original.sku;
          const image = props.row.original.image;
          return (
            <img loading="lazy" src={image} width={75} height={75} alt={sku} />
          );
        },
      },
      {
        header: "Actions",
        cell: (props) => {
          const _id = props.row.original._id;
          const name = props.row.original.name;
          return (
            <div
              className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
              role="group">
              <button
                onClick={() => router.push(`/product/detail/${_id}`)}
                type="button"
                className="inline-block rounded-l bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800">
                <AiOutlineEye size={15} />
              </button>
              <button
                onClick={() => handleDeletePopup(_id, name)}
                type="button"
                className=" inline-block rounded-r bg-red-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800">
                <CgTrashEmpty size={15} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleDeletePopup = async (id: string, name: string) => {
    Swal.fire({
      ...confirmationConfig,
      title: `<span style="font-weight: normal">Are you sure want to delete</span><br/>${name} ?`,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const deleting = await deleteProduct(id);

      if (deleting.status !== 200)
        Swal.fire(`Deleting ${name} failed.`, "", "error");

      Swal.fire(`${name} successfully deleted.`, "", "success");
      fetching(true);
    });
  };

  const fetching = async (isReplacing: boolean = false) => {
    setLoading(true);

    // if the product list already cached
    // and there's no callback params from adding a product
    // and this function not trigger by deleting or refreshing the list
    // then no need to hit the API again
    if (!callbackFromAddProduct && products.length > 0 && !isReplacing) {
      setLoading(false);
      return;
    }

    const fetchingNewData = await getProducts();

    setProducts(fetchingNewData.data);
    dispatch(replace(fetchingNewData.data));

    // if there's a callback params from adding a product
    // then refresh the page and remove the params
    if (callbackFromAddProduct) router.replace("/");

    setLoading(false);
  };

  useEffect(() => {
    // whenever cached product changed
    // then trigger fetching function
    fetching();
  }, [cachedProduct]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumbs
          links={[{ label: "Products", href: "/" }]}
          activeIndex={0}
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={() => fetching(true)}
            Content={
              <div className="flex items-center gap-2">
                <AiOutlineCloudSync size={20} />
                Refresh
              </div>
            }
          />
          <Button
            onClick={() => router.push("/product/add")}
            Content={
              <div className="flex items-center gap-2">
                <HiPlus size={20} />
                Add
              </div>
            }
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <Loading className="mx-auto" />
        ) : (
          <Table<IProduct> data={products} columns={columns} />
        )}
      </Card>

      {!loading && (
        <div className="mt-2 text-sm font-light  text-gray-600">
          Last updated {moment(cachedProduct.lastUpdated).fromNow()}
        </div>
      )}
    </div>
  );
}
