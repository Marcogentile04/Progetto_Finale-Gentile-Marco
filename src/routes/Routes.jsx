import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";
import AppLayout from "../Layout/AppLayout";
import AppHome from "../pages/AppHome";
/* import { preLoadedFilters } from "../lib/fecth" */
import AppGenre from "../pages/AppGenre";
import AppGame from "../pages/AppGame";
import AppProfile from "../pages/AppProfile";
import AppAccount from "../pages/AppAccount";
import AppSignIn from "../pages/AppSignIn";
import AppSignUp from "../pages/AppSignUp";
import AppPlatform from "../pages/AppPlatform";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";



/* const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<AppHome />} loader={()=>preLoadedFilters()} />
            <Route path="/games/:genre_slug" element={<AppGenre/>}/>
        </Route>
    )
); */

 export function ProtectedRoutes() {
  const session = useContext(SessionContext)
  if (!session) {
    return <Navigate to={'/'} />
  }

  return <Outlet />

}


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <AppHome />,
        /* loader: preLoadedFilters */
      },
      {
        path: "/games/:genre_slug",
        element: <AppGenre />,
      },
      {
        path: "/game/:id",
        element: <AppGame/>
        /* loader: {fetchGames} */
      },
      {
        path: "/games/:platform_slug",
        element: <AppPlatform />
      },
      {
        path: "/signin",
        element: <AppSignIn />
      },
      {
        path: "/signup",
        element: <AppSignUp />
      },
      
        /* element: <ProtectedRoutes/>, */
        {
          path: "/profile",
          element: <AppProfile />
        },
        {
          path: "/account",
          element: <AppAccount />
        },
      

    ],
  },
]);


export default router;