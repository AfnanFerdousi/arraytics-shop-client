import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div className="">
            <Navbar />
            <div>
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;