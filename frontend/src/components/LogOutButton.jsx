import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export const LogOutButton = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useUserContext();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className='bg-yellow-500 text-zinc-950 p-2 rounded hover:bg-yellow-600 h-fit'
    >
      Log Out
    </button>
  );
};
