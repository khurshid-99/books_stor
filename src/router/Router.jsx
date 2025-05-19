import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import AppLayout from "../components/AppLayout/AppLayout.jsx"

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <App /> }],
  },
]);

const Route = () => {
  return <RouterProvider router={createRouter} />;
};

export default Route;
