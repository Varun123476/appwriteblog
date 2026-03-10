import { PostForm } from "../components/index";


function AddPost() {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Create a new post</h1>
        <p className="text-sm text-gray-500 mt-1">
          Write something great and share it with the world.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <PostForm />
      </div>
    </section>
  );
}

export default AddPost;