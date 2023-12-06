import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContextObj = createContext();

export const useUserContext = () => useContext(UserContextObj);

const UserContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const sendToken = async () => {
    try {
      const userData = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUser(userData.data);
      setLoadingUser(false);
    } catch (error) {
      console.error('Error sending token', error);
    }
  };

  useEffect(() => {
    if (token) sendToken();
    else setLoadingUser(false);
  }, [token]);

  return (
    <UserContextObj.Provider
      value={{ token, setToken, user, setUser, loadingUser }}
    >
      {children}
    </UserContextObj.Provider>
  );
};

export default UserContext;
