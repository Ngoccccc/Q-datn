import React from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Slider from "./Slider";

function NavItem({ children }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        color="blue-gray"
        className="text-blue-gray-700 font-medium flex items-center gap-2 "
      >
        {children}
      </Typography>
    </li>
  );
}

function Landing() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  return (
    <div className="flex flex-col h-full w-full place-content-center gap-12">
      <div className="w-full container mx-auto px-4 text-center mb-8">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mx-auto my-1 w-full leading-snug  !text-2xl  lg:!text-5xl"
        >
          Quản lý chi tiêu{" "}
          <span className="text-blue-600 leading-snug ">
            đơn giản
          </span>{" "}
          và{" "}
          <span className="leading-snug text-blue-600">
            hiệu quả
          </span>
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 text-xs text-base"
        >
          Kiến thức về quản lý tài chính & Công cụ thống kê lại chi tiêu, kế hoạch chi tiêu, thu nhập
        </Typography>
      </div>
      <div className="h-1/2 container w-3/4 mx-auto text-center">
        <Slider />
      </div>
    </div>
  );
}

export default Landing;