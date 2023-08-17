"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/redux/slice/authSlice";
import { deleteCookie } from "cookies-next";
import { TOKEN } from "@/const/const";
import { useRouter } from "next/navigation";

const FrontNav = () => {
  const router = useRouter();
  const { isAuth, korzinaLength } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const openBar = () => {
    setOpen(!open);
  };

  const exitAuth = () => {
    const res = confirm("Do you want to log out of this account?");
    if (res) {
      dispatch(setAuth());
      deleteCookie(TOKEN);
      router.push("/");
    }
  };

  const navLink =
    "hover:text-blue-600 py-2 m-0 border-b-[1.5px] border-transparent hover:border-blue-600";
  const maxWidth = "max-[700px]";

  const navBar = `flex gap-3 items-center m-0 p-0 max-[700px]:fixed ${maxWidth}:w-[300px] ${maxWidth}:h-screen ${maxWidth}:flex-col justify-center top-0 ${maxWidth}:bg-black ${maxWidth}:bg-opacity-90 ${maxWidth}:text-white ${maxWidth}:text-xl`;

  return (
    <div className="bg-whitem text-white py-4 sm:py-5 flex justify-between items-center containr text-lg z-10">
      <div className="text-[23px] font-semibold">
        <Link href="/">Voha Parfum</Link>
      </div>
      <ul
        style={{ transition: "0.3s" }}
        className={navBar + (open ? " left-0" : " -left-[300px]")}
      >
        <li>
          <Link className={navLink} href="/">
            Asosiy
          </Link>
        </li>
        <li>
          <Link className={navLink} href="/about">
            Biz haqimizda
          </Link>
        </li>
        {isAuth ? (
          <li>
            <Link className={navLink} href="/orderhistory">
              Buyurtmalar tarixi
            </Link>
          </li>
        ) : (
          <li>
            <Link className={navLink} href="/register">
              Register
            </Link>
          </li>
        )}

        {isAuth ? (
          <li className="relative">
            <Link href="/cartshopping">
              <i className="fa-solid fa-cart-shopping hover:text-red-500 text-green-500" />
            </Link>
            <p style={{height:"15px"}} className="absolute -top-1 -right-1 bg-white text-black px-[2px] text-[11px] flex items-center rounded-full">{korzinaLength}</p>
          </li>
        ) : null}
        {isAuth ? (
          <li>
            <Link
              href="/account"
              className="py-1 bg-white text-black px-3 rounded"
            >
              Account
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/login"
              className="py-1 bg-white text-black px-3 rounded"
            >
              Login
            </Link>
          </li>
        )}
        {isAuth && (
          <li>
            <i
              onClick={exitAuth}
              className="fa-solid fa-right-from-bracket text-red-600 cursor-pointer"
            />
          </li>
        )}

        <div
          onClick={openBar}
          className="text-white absolute top-2 right-3 text-[24px] cursor-pointer max-[750px]:block hidden"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </ul>
      <div
        onClick={openBar}
        className="hidden max-[750px]:block text-[24px] cursor-pointer"
      >
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  );
};

export default FrontNav;
