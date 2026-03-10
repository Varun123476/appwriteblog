import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import databaseService from "../appwrite/config";
import { PostCard } from "../components/index";

function MyPosts() {
  const userData              = useSelector((s) => s.auth.userData);
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!userData?.$id) return;
    databaseService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((res) => setPosts(res?.rows ?? []))
      .catch(() => setError("Could not load your posts."))
      .finally(() => setLoading(false));
  }, [userData]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="mt-16 text-center text-red-500 text-sm">{error}</p>;

  if (posts.length === 0) {
    return (
      <div className="mt-20 flex flex-col items-center gap-5 text-center max-w-sm mx-auto">
        <span className="text-5xl">📭</span>
        <h2 className="text-xl font-bold text-gray-800">No posts yet</h2>
        <p className="text-gray-500 text-sm">You haven't written anything yet.</p>
        <Link
          to="/add-post"
          className="px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          Write your first post
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          to="/add-post"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          + New post
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </section>
  );
}

export default MyPosts;
