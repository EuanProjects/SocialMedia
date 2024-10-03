import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/components/errorPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"

const routes = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path:"/",
                element: <App />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/sign-up",
                element:<SignUp />
            },
            {
                profile:"/profile",
                element:<Profile />
            }
        ],
        errorElement: <ErrorPage />,
    }
])


  

export default routes;