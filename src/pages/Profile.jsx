import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const userData = useSelector((s) => s.auth.userData);
  const [copied, setCopied] = useState(false);

  const initials = userData?.name
    ? userData.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleCopy = () => {
    navigator.clipboard.writeText(userData?.email || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const details = [
    {
      label: "Full name",
      value: userData?.name || "—",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      label: "Email address",
      value: userData?.email || "—",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      action: (
        <button
          onClick={handleCopy}
          className="text-xs text-orange-500 hover:underline font-medium"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      ),
    },
    {
      label: "User ID",
      value: userData?.$id || "—",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
        </svg>
      ),
    },
    {
      label: "Member since",
      value: userData?.$createdAt
        ? new Date(userData.$createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-2xl mx-auto">

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Your personal account details.</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Avatar banner */}
        <div className="bg-linear-to-r from-orange-400 to-orange-500 h-24 w-full" />

        {/* Avatar + name */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-6">
            <div className="w-20 h-20 rounded-full bg-white ring-4 ring-white shadow-md flex items-center justify-center text-2xl font-extrabold text-orange-500">
              {initials}
            </div>
            {/* <div className="mb-1">
              <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                {userData?.name || "User"}
              </h2>
              <p className="text-sm text-gray-400">{userData?.email || ""}</p>
            </div>  */}
          </div>

          {/* Detail rows */}
          <ul className="divide-y divide-gray-100">
            {details.map(({ label, value, icon, action }) => (
              <li key={label} className="flex items-center gap-4 py-4">
                {/* Icon */}
                <span className="shrink-0 w-8 h-8 rounded-lg bg-orange-50 text-orange-400 flex items-center justify-center">
                  {icon}
                </span>

                {/* Label + value */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
                </div>

                {/* Optional action */}
                {action && <div className="shrink-0">{action}</div>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-4 flex gap-3">
        <Link
          to="/my-posts"
          className="flex-1 text-center px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-orange-300 transition-colors"
        >
          My posts
        </Link>
        <Link
          to="/settings"
          className="flex-1 text-center px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-orange-300 transition-colors"
        >
          Settings
        </Link>
        <Link
          to="/add-post"
          className="flex-1 text-center px-4 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          + New post
        </Link>
      </div>

    </section>
  );
}

export default Profile;