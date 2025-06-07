import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "../components/Loader/Loader";
import ProtectedRoute from "../components/Routes/ProtectedRoute";
import PublicRoute from "../components/Routes/PublicRoute";
import Layout from "../components/Layout/Layout";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Auth = React.lazy(() => import("../pages/Auth/Auth"));
const CreateFacility = React.lazy(() =>
  import("../pages/CreateFacility/CreateFacility")
);
const Admin = React.lazy(() => import("../pages/Admin/Admin"));
const Facility = React.lazy(() => import("../pages/Facility/Facility"));
const EditFacility = React.lazy(() =>
  import("../pages/EditFacility/EditFacility")
);
const Organizations = React.lazy(() =>
  import("../pages/Organizations/Organizations")
);
const CreateOrganization = React.lazy(() =>
  import("../pages/CreateOrganization/CreateOrganization")
);
const EditOrganization = React.lazy(() =>
  import("../pages/EditOrganization/EditOrganization")
);
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Notifications = React.lazy(() =>
  import("../pages/Notifications/Notifications")
);

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
    path: "/profile/:id",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/notifications",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Notifications />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/organizations",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Organizations />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/organizations/create",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <CreateOrganization />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/organizations/edit/:id",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <EditOrganization />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "facility/create",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <CreateFacility />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/facility/:id",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <Facility />
          </Layout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/facility/edit/:id",
    element: (
      <Suspense fallback={<Loader size={86} />}>
        <ProtectedRoute>
          <Layout>
            <EditFacility />
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
