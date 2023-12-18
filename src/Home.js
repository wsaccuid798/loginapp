import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Welcome Home!</h1>
        <p className="text-center text-gray-600">You are now logged in.</p>
      </div>
    </div>
  );
};

export default Home;
