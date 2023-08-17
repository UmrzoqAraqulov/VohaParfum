import FrontFooter from "@/components/footers/FrontFooter";
import dynamic from "next/dynamic";
// import FrontNav from "@/FrontNav/navs/FrontNav";

const FrontNav = dynamic(() => import("@/components/navs/FrontNav"), {
  ssr: false,
}); 

import { Fragment } from "react";

const layout = ({ children }) => {
  return (
    <Fragment>
      <nav className="bg-black bg-opacity-30 backdrop-blur-md fixed top-0 left-0 w-full z-10">
        <FrontNav />
      </nav>
      <div
        style={{ background: `url(/header.png)`, backgroundSize: "cover" }}
        className=" text-white pt-20 overflow-y-scroll fixed top-0 left-0 w-screen h-screen"
      >
        <main>{children}</main>
        <footer className="containr bg-white bg-opacity-20 backdrop-blur-md rounded-md p-7">
          <FrontFooter />
        </footer>
      </div>
    </Fragment>
  );
};

export default layout;
