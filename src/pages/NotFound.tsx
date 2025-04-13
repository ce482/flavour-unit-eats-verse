
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // Log additional debugging info
    console.log("Current base URL:", window.location.origin);
    console.log("Full current path:", window.location.href);
    console.log("Location state:", location);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! Page not found</p>
        <p className="text-sm text-gray-500 mb-6">
          The path "{location.pathname}" does not exist.
        </p>
        <div className="flex flex-col space-y-3">
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline font-medium">
            Return to Home
          </Link>
          <div className="text-xs text-gray-400 pt-2">
            Base URL: {window.location.origin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
