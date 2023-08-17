import Image from "next/image";
import Link from "next/link";

const Categories = ({categories}) => {
  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 containr gap-3">
      {categories?.map((ctg) => (
        <div
          key={ctg._id}
          className="rounded bg-white bg-opacity-20 p-4 hover:bg-opacity-10 backdrop-blur-md"
        >
          <Image
            src={ctg?.image?.url}
            alt="product img"
            height={200}
            width={300}
            style={{
              objectFit: "cover",
              height: "280px",
              width: "100%",
              borderRadius: "6px",
            }}
          />
          <Link
            href={`/category/${ctg._id}`}
            className="w-full text-lg text-center font-semibold py-2 inline-block bg-white bg-opacity-30 backdrop-blur-lg rounded-md mt-3"
          >
            {ctg.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories