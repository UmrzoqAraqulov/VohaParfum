"use client";
import { KORZINA } from "@/const/const";
import { setLengthKorzina } from "@/redux/slice/authSlice";
import { request } from "@/server/request";
import { Button, Empty, message } from "antd";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

const CartShoppingPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(
    JSON.parse(
      typeof window !== "undefined"
        ? window.localStorage.getItem(KORZINA)
        : false
    ) || []
  );
  const [loading, setLoading] = useState(false);

  const setInfo = (arr) => {
    setProducts(arr);
    typeof window !== "undefined"
      ? window.localStorage.setItem(TOKEN, arr)
      : false;
  };
  const increment = (pr) => {
    let arr = products.map((el) => {
      if (el._id == pr._id) {
        el.quantity += 1;
      }
      return el;
    });
    setInfo(arr);
  };

  const decrement = (pr) => {
    let arr = [];
    products.map((el) => {
      if (el._id == pr._id) {
        if (el.quantity > 1) {
          el.quantity -= 1;
          arr.push(el);
        }
      } else {
        arr.push(el);
      }
    });
    setInfo(arr);
  };

  const booking = async () => {
    let arr = [];
    products.map((el) => {
      arr.push({ product: el._id, quantity: el.quantity });
    });
    try {
      setLoading(true);
      const { data } = await request.post("payment", { cart: arr });
      setInfo([]);
      dispatch(setLengthKorzina(false));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center py-2 sm:text-3xl text-xl">Buyurtma berish</h2>
      <div className="mb-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 containr gap-3 p-2">
            {products?.map((pr) => (
              <div
                key={pr._id}
                className="bg-white cart bg-opacity-20 backdrop-blur-md text-white rounded p-0.5 border-black"
              >
                <Image
                  src={pr?.image?.url}
                  alt="product img"
                  height={200}
                  width={300}
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    width: "100%",
                    borderRadius: "3px 3px 0px 0px",
                  }}
                />
                <div className="py-2 px-4">
                  <h3 className="text-center w-full font-semibold text-xl">
                    {pr?.title}
                  </h3>
                  <p className="py-1 m-0">Narx: {pr?.price}</p>
                  <div className="flex items-center gap-x-2 backdrop-blur-md bg-white bg-opacity-20 mx-auto rounded-md w-[100px]">
                    <Button
                      onClick={() => decrement(pr)}
                      className="border-none bg-red-600 text-white text-xl pt-0"
                    >
                      -
                    </Button>
                    <p className="text-black p-0 m-0">{pr.quantity}</p>
                    <Button
                      onClick={() => increment(pr)}
                      className="border-none bg-white pt-0 text-xl"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white bg-opacity-20 rounded-md backdrop-blur-md containr py-3">
            <Empty />
          </div>
        )}
      </div>
      {products.length > 0 ? (
        <div className="booking flex justify-center my-4">
          <Button
            loading={loading}
            onClick={booking}
            className="mx-auto pt-[1px] hover:scale-105 text-white border-none bg-green-600 bg-opacity-60 backdrop-blur-md px-4 rounded-md text-lg"
          >
            Buyurtma qilish
          </Button>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CartShoppingPage;
