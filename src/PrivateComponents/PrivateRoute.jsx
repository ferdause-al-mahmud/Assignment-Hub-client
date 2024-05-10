/* eslint-disable react/prop-types */
import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="w-full h-[80vh] flex items-center justify-center ">
            <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/juggling-load-malabares-gJ3mEToTDJn3LT6kCT">via GIPHY</a></p>
        </div>;
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;