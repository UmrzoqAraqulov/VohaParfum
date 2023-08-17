import Categories from "@/components/categories/Categories";
import Carusel from "@/components/slider/Slider";
import { request } from "@/server/request";

async function getLatestProduct() {
  try {
    return request("last-products");
  } catch (err) {
    throw new Error("Late");
  }
}

async function getCategories() {
  try {
    return request("category");
  } catch (err) {
    throw new Error("Late");
  }
}

export default async function HomePage() {
  const { data: latestProducts } = await getLatestProduct();
  const { data: categories } = await getCategories();
  return (
    <div>
      <div>
        <h2 className="text-center text-2xl sm:text-[34px] py-3 font-semibold">
          Yangi Mahsulotlar
        </h2>
        <div className="containr rounded p-5 bg-white bg-opacity-10 backdrop-blur-md">
          <Carusel products={latestProducts} />
        </div>
      </div>
      <div className="pb-5">
        <h2 className="text-center text-2xl sm:text-[32px] py-4 font-semibold">
          Mahsulotlar kategoriyasi
        </h2>
        <Categories categories={categories} />
      </div>
    </div>
  );
}
