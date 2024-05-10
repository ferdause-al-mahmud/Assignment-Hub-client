
import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../MainLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Assignments from "../PublicComponents/Assignments";
import CreateAssignments from "../PrivateComponents/CreateAssignments";
import PendingAssignment from "../PrivateComponents/PendingAssignment";
import PrivateRoute from "../PrivateComponents/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Homepage></Homepage>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/assignments",
                element: <Assignments></Assignments>
            },
            {
                path: "/create",
                element: <PrivateRoute><CreateAssignments></CreateAssignments></PrivateRoute>
            },
            {
                path: "/pending",
                element: <PrivateRoute><PendingAssignment></PendingAssignment></PrivateRoute>
            },
        ]
    },
]);