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
  IconButton,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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
import { CreateGroup } from "../components/Group/CreateGroup";

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = () => setOpen(!open);


  return (
      <div className="h-full flex flex-col">
        <div className="h-1/6 flex items-center gap-4 pl-4 pr-4 justify-between">
          <Typography variant="h5" color="blue-gray">
            Messages
          </Typography>
          {/* <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300" onClick={setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button> */}
        <CreateGroup/>

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