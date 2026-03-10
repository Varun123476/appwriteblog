import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from "./components";
import './App.css'

function App() {
  const dispatch          = useDispatch();
  const [loading, setLoading] = useState(true);

  // Check if a session already exists on every app load.
  // Populates Redux before any page renders.
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) dispatch(login(user));
        else      dispatch(logout());
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium tracking-wide">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
