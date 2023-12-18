import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    setIsLoggedIn(false); // Update state

    // Redirect to login or home page
    navigate('/login');
  }, [setIsLoggedIn, navigate]);

  // Optionally, render a message or a spinner while logging out
  return <div>Logging out...</div>;
};

export default Logout;
