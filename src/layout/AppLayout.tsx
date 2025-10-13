import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const AppLayout = () => {
    return (
        <div className="flex flex-col">
            <div className="pageOutlet">
                <Outlet />
            </div>
            <div className="navbar">
            <Navbar />

            </div>
        </div>
    );
};

export default AppLayout;
