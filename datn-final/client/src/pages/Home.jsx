import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Home() {
  return (
    <div className="h-screen flex flex-col items-center">
      <ToastContainer />
      <div className="w-full max-w-screen-xl">
        <Header />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
