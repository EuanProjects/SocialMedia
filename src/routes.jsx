import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/components/errorPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"
import { signupPost } from "./pages/SignUp/SignUp.actions";  
import { loginPost } from "./pages/Login/login.actions";
import { profileLoader } from "./pages/Profile/profile.loaders";

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
                action: loginPost,
                element: <Login />
            },
            {
                path: "/sign-up",
                action: signupPost,
                element: <SignUp />
            },
            {
                path: "/profile/:profileID",
                loader: profileLoader,
                element: <Profile />,
            }
        ],
        errorElement: <ErrorPage />,
    }
]);


  

export default routes;