import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-montserrat">
            <div className="flex-grow">
                <div className="max-w-7xl  mx-auto">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
