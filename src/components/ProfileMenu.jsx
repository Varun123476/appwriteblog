import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../features/authSlice";
function ProfileMenu() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const userData   = useSelector((s) => s.auth.userData);
  const [open, setOpen] = useState(false);
  const menuRef    = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Derive initials from name for the avatar
  const initials = userData?.name
    ? userData.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const menuItems = [
    {
      label: "Profile",
      to: "/profile",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      label: "Settings",
      to: "/settings",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center justify-center
          w-9 h-9 rounded-full
          bg-orange-500 text-white
          text-sm font-bold tracking-wide
          hover:bg-orange-600 transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
        "
        aria-haspopup="true"
        aria-expanded={open}
      >
        {initials}
      </button>

      {/* Dropdown */}
      {open  && (
        <div className="
          absolute right-0 mt-2 w-52
          bg-white border border-gray-100 rounded-xl shadow-lg
          py-1 z-50
          animate-in fade-in slide-in-from-top-1 duration-150
        ">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{userData?.name || "User"}</p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{userData?.email || ""}</p>
          </div>

          {/* Menu items */}
          <ul className="py-1">
            {menuItems.map(({ label, to, icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center gap-3 px-4 py-2.5
                    text-sm text-gray-700
                    hover:bg-gray-50 hover:text-orange-500
                    transition-colors duration-100
                  "
                >
                  <span className="text-gray-400 group-hover:text-orange-400">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider + Logout */}
          <div className="border-t border-gray-100 pt-1 pb-1">
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-3 w-full px-4 py-2.5
                text-sm text-red-500
                hover:bg-red-50
                transition-colors duration-100
              "
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
