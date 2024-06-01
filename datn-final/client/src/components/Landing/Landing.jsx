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
    <>
      <header className="p-8 w-full">
        <div className="grid mt-16 ">
          <div className="w-full container mx-auto px-4 text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
              Quản lý chi tiêu{" "}
              <span className="text-blue-500 leading-snug ">
               đơn giản
              </span>{" "}
              và{" "}
              <span className="leading-snug text-blue-500">
                hiệu quả
              </span>
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              The time is now for it to be okay to be great. For being a bright
              color. For standing out.
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Input color="gray" label="Enter your email" size="lg" />
                <Button
                  color="gray"
                  className="w-full px-4 md:w-[12rem]"
                >
                  get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Landing;