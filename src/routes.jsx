import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/components/errorPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"
import { signupPost } from "./pages/SignUp/signup.actions";  

const routes = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/sign-up",
                action: signupPost,
                element: <SignUp />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ],
        errorElement: <ErrorPage />,
    }
]);


  

export default routes;