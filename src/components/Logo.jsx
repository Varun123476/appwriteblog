import React from "react";
import { Link } from "react-router-dom";

function Logo({ width = "100px" }) {
  return (
    <Link to="/" style={{ width }} className="inline-flex items-center gap-2 no-underline">
      {/* Icon mark */}
      <span className="flex items-center justify-center w-8 h-8 rounded-md bg-orange-500 text-white font-bold text-lg leading-none">
        M
      </span>
      {/* Word mark */}
      <span className="text-xl font-extrabold tracking-tight text-gray-900">
        mega<span className="text-orange-500">blog</span>
      </span>
    </Link>
  );
}

export default Logo;
