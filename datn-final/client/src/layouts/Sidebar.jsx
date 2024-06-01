import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import UserBox from "../components/UserBox";

function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-1/6 flex items-center gap-4 pl-4 pr-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Messages
        </Typography>
      </div>
      <div className=" pl-4 pr-4 flex flex-col">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
        <hr className="mt-2 my-2 border-blue-gray-50" />
      </div>
      <div className="flex-1 overflow-y-auto pl-4 pr-4">

        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
        <UserBox />
      </div>
    </div>
  );
}

export default Sidebar