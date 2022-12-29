import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import ComplitedTask from "../../Pages/ComplitedTask/ComplitedTask";
import Login from "../../Pages/Login/Login";
import MyTask from "../../Pages/MyTask/MyTask";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <AddTask></AddTask>
            },
            {
                path: '/mytasks',
                element: <MyTask></MyTask>
            },
            {
                path: '/complitedtasks',
                element: <ComplitedTask></ComplitedTask>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Login></Login>
            },
            
        ]
    }
])

export default router;