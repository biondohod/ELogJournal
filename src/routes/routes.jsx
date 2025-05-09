import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "../components/Loader/Loader";
import ProtectedRoute from "../components/Routes/ProtectedRoute";
import PublicRoute from "../components/Routes/PublicRoute";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Auth = React.lazy(() => import("../pages/Auth/Auth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <PublicRoute>
          <Auth />
        </PublicRoute>
      </Suspense>
    ),
  },
]);

export default router;
