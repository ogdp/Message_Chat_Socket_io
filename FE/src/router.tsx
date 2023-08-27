import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LayoutWebsite from "./layouts/LayoutWebsite";
import MessageManager from "./pages/web/message";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import RoomChat from "./pages/web/message/RoomChat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      {
        index: true,
        element: <Navigate to="messages" />,
      },
      {
        path: "messages",
        element: <MessageManager />,
      },
      {
        path: "chat",
        element: <RoomChat />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          </div>
        ),
      },
    ],
  },
]);
