import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/components/errorPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"
import { signupPost } from "./pages/SignUp/signup.actions";
import { loginPost } from "./pages/Login/login.actions";
import { profileLoader } from "./pages/Profile/Profile.loaders";
import { profileAction } from "./pages/Profile/Profile.actions";
import Setup from "./pages/Profile/setup/Setup";
import Feed from "./pages/Profile/feed/Feed";
import { setupAction } from "./pages/Profile/setup/Setup.actions";
import Settings from "./pages/settings/Settings";
import { settingsLoader } from "./pages/settings/settings.loaders";
import { settingsAction } from "./pages/settings/settings.actions";
import Page from "./pages/Profile/page/Page";
import Friends from "./pages/Profile/friends/Friends";
import Home from "./pages/Profile/friends/Home";
import FriendRequests from "./pages/Profile/friends/FriendRequests";
import Suggestions from "./pages/Profile/friends/Suggested/Suggestions";
import AllFriends from "./pages/Profile/friends/AllFriends";
import { suggestionsLoader } from "./pages/Profile/friends/Suggested/Suggestions.loader";
import ProfilePage from "./pages/Profile/components/ProfilePage";
import { friendsAction } from "./pages/Profile/friends/Friends.action";
import { friendsLoader } from "./pages/Profile/friends/Friends.loader";
import { pageLoader } from "./pages/Profile/page/Page.loader";
import { pageAction } from "./pages/Profile/page/Page.actions";

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
                path: "/profile/:profileId",
                element: <Profile />,
                children: [
                    {
                        path: "feed",
                        element: <Feed />,
                        loader: profileLoader,
                        action: profileAction,
                    },
                    {
                        path: "setup",
                        element: <Setup />,
                        action: setupAction
                    },
                    {
                        path: "settings",
                        element: <Settings />,
                        loader: settingsLoader,
                        action: settingsAction
                    },
                    {
                        path: "page",
                        element: <Page />,
                        loader: pageLoader,
                        action: pageAction
                    },
                    {
                        path: "friends",
                        element: <Friends />,
                        loader: friendsLoader,
                        action: friendsAction
                        // children: [
                            // {
                            //     path: "",
                            //     element: <Home />
                            // },
                            // {
                            //     path: "friendrequests",
                            //     element: <FriendRequests />
                            // },
                            // {
                            //     path: "suggested",
                            //     element: <Suggestions />,
                            //     loader: suggestionsLoader,
                                // children: [
                                //     {
                                //         path: ":suggestedProfileId",
                                //         element: <ProfilePage />,
                                //         loader: suggestionsLoader,
                                //     }
                                // ]
                            // },
                            // {
                            //     path: "allfriends",
                            //     element: <AllFriends />
                            // }
                        // ]
                    }
                ]
            }
        ],
        errorElement: <ErrorPage />,
    }
]);




export default routes;