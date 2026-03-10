

import { Link } from "react-router-dom";
import databaseService from "../appwrite/config";



function PostCard({ $id, title, featuredImage, status, slug }) {

  
  
  return (
    <Link
      to={`/post/${slug}`}
      className="group block rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Cover image */}
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        {featuredImage ? (
          <img
            src={databaseService.getFileView(featuredImage)}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            📝
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="p-4">
        {/* Status badge */}
        <span
          className={`inline-block mb-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
            status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {status}
        </span>

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-orange-500 transition-colors duration-150">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;