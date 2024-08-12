import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md py-4 flex items-center justify-between px-8">
      <div className="text-gray-600 text-xl font-semibold">Flash Cards</div>
      
      {isLoggedIn ? (
        <button onClick={handleLogout} className="text-gray-600">Logout</button>
      ) : (
        <Link to={'/signin'} className="text-gray-600">Login</Link>
      )}
    </div>
  );
};

export default Header;