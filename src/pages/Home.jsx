import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/config"
import { PostCard } from "../components/index";


function Home() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const authStatus            = useSelector((s) => s.auth.status);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((res) => (
        setPosts(res.rows)
      ))
      .catch(() => setError("Could not load posts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

 
  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
              <div className="h-4 w-1/2 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="mt-16 text-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  // ── Empty + guest hero ───────────────────────────────────────────────────
  if (posts?.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center text-center gap-6 max-w-lg mx-auto">
        <span className="text-6xl">✍️</span>
        <h1 className="text-3xl font-extrabold text-gray-900">
          No posts yet.
        </h1>
        <p className="text-gray-500 text-base">
          {authStatus
            ? "Be the first to share something with the world."
            : "Create an account and start writing today."}
        </p>
        {authStatus ? (
          <Link
            to="/add-post"
            className="px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors"
          >
            Write your first post
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors"
            >
              Get started — it's free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    );
  }
  
  // ── Feed ─────────────────────────────────────────────────────────────────
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Latest posts</h1>
        {authStatus && (
          <Link
            to="/add-post"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            + New post
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </section>
  );
}

export default Home;
