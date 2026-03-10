import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import databaseService from "../appwrite/config";

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((s) => s.auth.userData);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const isAuthor = post && userData && post.userId === userData.$id;

  useEffect(() => {
    if (!slug) return navigate("/");
    databaseService
      .getPost(slug)
      .then((post) => {
        if (post) setPost(post);
        else navigate("/");
      })
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await databaseService.deletePost(post.$id);
      if (post.featuredImage) await databaseService.deleteFile(post.featuredImage);
      navigate("/");
    } catch {
      setError("Delete failed. Please try again.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-8 animate-pulse space-y-4">
        <div className="h-8 w-2/3 bg-gray-200 rounded-full" />
        <div className="aspect-video w-full bg-gray-200 rounded-xl" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 rounded-full"
              style={{ width: `${85 - i * 5}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mt-24 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-gray-800">{error || "Post not found"}</h2>
        <Link to="/" className="mt-4 inline-block text-sm text-orange-500 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors"
      >
        ← All posts
      </Link>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        {post.title}
      </h1>

      {/* Author controls */}
      {isAuthor && (
        <div className="flex gap-3 mb-6">
          <Link
            to={`/edit-post/${post.slug}`}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            Edit post
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete post"}
          </button>
        </div>
      )}

      {/* Featured image */}
      {post.featuredImage && (
        <div className="mb-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <img
            src={databaseService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full object-cover max-h-120"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-gray prose-lg max-w-none text-gray-900 bg-white p-4 rounded shadow-sm">
        {parse(post.content)}
      </div>
    </article>
  );
}

export default Post;