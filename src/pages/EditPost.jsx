import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/config";
import { PostForm } from "../components/index";

function EditPost() {
  const { slug }              = useParams();
  const navigate              = useNavigate();
  const userData              = useSelector((s) => s.auth.userData);
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!slug) return navigate("/");
    databaseService
      .getPost(slug)
      .then((doc) => {
        if (doc.userId !== userData?.$id) return navigate(`/post/${slug}`);
        setPost(doc);
      })
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false));
  }, [slug, navigate, userData]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-8 animate-pulse space-y-4">
        <div className="h-7 w-48 bg-gray-200 rounded-full" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mt-24 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-gray-800">{error || "Post not found"}</h2>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Edit post</h1>
        <p className="text-sm text-gray-500 mt-1 truncate">
          Editing: <span className="font-medium text-gray-700">{post.title}</span>
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <PostForm post={post} />
      </div>
    </section>
  );
}

export default EditPost;
