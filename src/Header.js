import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {isLoggedIn ? (
          <>
            {/* Add your logout logic or link */}
            <Link to="/logout" className="text-white px-3 py-2 rounded-md text-sm font-medium">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
