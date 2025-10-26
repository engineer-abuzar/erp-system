import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <h1 className="text-[8rem] font-extrabold text-blue-600 leading-none">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved.  
        Please check the URL or go back to the homepage.
      </p>
      <Link
        to="/loggedin"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Go Home
      </Link>
      
    </div>
  );
};

export default NotFound;
