"use client";
import { KORZINA, LIMIT } from "@/const/const";
import { setLengthKorzina } from "@/redux/slice/authSlice";
import { request } from "@/server/request";
import { Button, Pagination, Select, message } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState({ total: 0, products: [] });
  const [page, setPage] = useState(1);
  const { categoryId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([{}]);
  const [categoryName, setCategoryName] = useState("");

  const getProducts = useCallback(
    async (categoryId) => {
      try {
        const { data } = await request(
          `product?category=${categoryId}&limit=${LIMIT}&page=${page}&search=${search}`
        );
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    },
    [page, search]
  );

  const getCategories = useCallback(async () => {
    let arr = [];
    try {
      const { data } = await request("category");
      data?.map((el) => {
        arr.push({ value: el._id, label: el.name });
      });
      setCategories(arr);
      arr.map((ctg) => {
        if (ctg?.value === categoryId) {
          setCategoryName(ctg?.label);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }, [categoryId]);

  useEffect(() => {
    getProducts(categoryId);
    getCategories();
  }, [categoryId, getProducts, getCategories]);

  const searchProduct = (e) => {
    setSearch(e.target.value);
  };

  const changePage = (current) => {
    setPage(current);
  };

  const handleChange = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  const addProduct = (pr) => {
    if (!isAuth) {
      message.error("You must login first!");
    } else {
      let arr = JSON.parse(localStorage.getItem(KORZINA)) || [];
      let obj = {
        title: pr.title,
        _id: pr._id,
        price: pr.price,
        image: pr.image,
        quantity: 1,
      };
      let check = true;
      arr.map((el) => {
        if (el._id == pr._id) {
          el.quantity += 1;
          check = false;
        }
        return el;
      });
      if (check) {
        arr.push(obj);
        dispatch(setLengthKorzina(true));
      }
      localStorage.setItem(KORZINA, JSON.stringify(arr));
    }
  };

  return (
    <div className="containr">
      <div className="flex justify-between py-6 flex-wrap flex-row gap-5 items-center max-[850px]:justify-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={searchProduct}
          className="outline-none border-b-[1.4px] bg-transparent px-2"
        />

        <div className="flex gap-5 max-[500px]:flex-col">
          <div className="flex items-center ">
            <p className="pr-1 pt-3">Saralash:</p>
            <select
              name="sort"
              className="py-1 px-2 rounded bg-black bg-opacity-40 text-white"
            >
              <option value="yangilari">Yangilari</option>
              <option value="eskilar">Eskilar</option>
              <option value="eng_kup_sotilganlari">Eng kup sotilganlari</option>
              <option value="kamayish">Narx: kamayish</option>
              <option value={`o'sish`}>Narx: {`o'sish`}</option>
            </select>
          </div>
          {categoryName ? (
            <div className="flex items-center ">
              <p className="pr-1 pt-3">Category:</p>
              <Select
                className="bg-black bg-opacity-20 backdrop-blur-md"
                defaultValue={categoryName}
                style={{ width: 120 }}
                onChange={handleChange}
                options={categories}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 containr gap-3 p-2">
        {products?.products?.map((pr) => (
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
              <p className="py-1 m-0">Miqdor: {pr?.sold}</p>
              <p className="py-1 m-0">Narx: {pr?.price}</p>
              <Button
                onClick={() => addProduct(pr)}
                className="py-1 px-3 rounded bg-white bg-opacity-20 backdrop-blur-md"
              >{`Qo'shish`}</Button>
            </div>
          </div>
        ))}
      </div>
      {products.total !== 0 && (
        <div className="my-5 py-2 rounded flex justify-center bg-white bg-opacity-20 backdrop-blur-md">
          <Pagination
            onChange={changePage}
            defaultCurrent={page}
            pageSize={LIMIT}
            total={products.total}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
