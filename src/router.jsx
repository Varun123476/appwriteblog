import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthLayout } from "./components/index";
import Home from "./pages/Home";
import AddPost from './pages/AddPost';
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPosts from './pages/MyPosts';
import Post from "./pages/Post";
import Profile from "./pages/Profile"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ── Public ──────────────────────────────────────────────────────
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "post/:slug",
        element: <Post />,
      },

      // ── Guest only (logged-in users get redirected to /) ────────────
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      // ── Protected (guests get redirected to /login) ─────────────────
      {
        path: "add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "my-posts",
        element: (
          <AuthLayout authentication>
            <MyPosts />
          </AuthLayout>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      }

    ],
  },
]);

export default router;
