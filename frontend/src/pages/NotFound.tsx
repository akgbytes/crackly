import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="text-5xl animate-bounce mb-4">🧐</div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-6">
        Hmm... looks like this page didn’t crack it.
      </p>
      <Link
        to="/"
        className="px-4 py-2 text-sm font-medium text-zinc-50 bg-sky-600 rounded-md hover:bg-sky-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
