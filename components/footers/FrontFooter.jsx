const FrontFooter = () => {
  return (
    <div className="flex justify-between gap-3 md:px-10 sm:flex-row flex-col items-center sm:items-start sm:text-left text-center">
      <div>
        <h3 className="font-semibold text-xl pb-2">Biz haqimizda</h3>
        <div className="flex gap-4 text-2xl">
          <i className="fa-brands fa-instagram hover:scale-110 cursor-pointer text-pink-600"></i>
          <i className="fa-brands fa-telegram hover:scale-110 cursor-pointer text-green-500"></i>
          <i className="fa-brands fa-youtube hover:scale-110 cursor-pointer text-red-500"></i>
          <i className="fa-brands fa-facebook hover:scale-110 cursor-pointer bg-blue-700 rounded-full"></i>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-0">
        <h3 className="font-semibold text-xl pb-2">Biz bilan {`bog'lanish`}</h3>
        <div className="md:flex-row flex flex-col sm:gap-3 text-base">
          <p className="font-semibold my-1">Manzilimiz:</p>
          <p className="my-1">Samarqand viloyati,Juma shahri</p>
        </div>
        <div className="md:flex-row flex flex-col sm:gap-3 text-base">
          <p className="font-semibold my-1">Nomer:</p>
          <p className="my-1">+998 78 777 77 77</p>
        </div>
        <div className="md:flex-row flex flex-col sm:gap-3 text-base">
          <p className="font-semibold my-1">Email:</p>
          <p className="my-1">vohaShopOnline@gmail.com</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-xl pb-2">Yangiliklar</h3>
      </div>
    </div>
  );
};

export default FrontFooter;
