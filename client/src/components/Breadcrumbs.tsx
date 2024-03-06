import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lengthOfPathSegment = pathSegments;
  console.log(lengthOfPathSegment);
  return (
    <nav className="mb-4 max-w-lg pl-40">
      <ul className="flex items-center space-x-2 text-gray-500">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index} className="flex items-center">
            <>
              {index < pathSegments.length - 1 ? (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    className="text-blue-500 hover:underline"
                  >
                    <span>{segment}</span>
                  </Link>
                </>
              ) : (
                <>
                  <span className="mx-2">/</span>
                  <span className="mx-2">{segment}</span>
                </>
              )}
            </>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
