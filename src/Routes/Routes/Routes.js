import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import ComplitedTask from "../../Pages/ComplitedTask/ComplitedTask";
import Login from "../../Pages/Login/Login";
import MyTask from "../../Pages/MyTask/MyTask";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: '/mytasks',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: '/complitedtasks',
                element: <PrivateRoute><ComplitedTask></ComplitedTask></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            
            
        ]
    }
])

export default router;