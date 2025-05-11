import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "../components/Loader/Loader";
import ProtectedRoute from "../components/Routes/ProtectedRoute";
import PublicRoute from "../components/Routes/PublicRoute";
import Layout from "../components/Layout/Layout";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Auth = React.lazy(() => import("../pages/Auth/Auth"));
const Create = React.lazy(() => import("../pages/Create/Create"));
const Admin = React.lazy(() => import("../pages/Admin/Admin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/create",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Create />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Admin />
          </Layout>
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
