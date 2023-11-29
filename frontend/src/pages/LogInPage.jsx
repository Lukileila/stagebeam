import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useUserContext} from '../context/UserContext'

export const LogInPage = () => {
  const navigate = useNavigate()
  const {setUser} = useUserContext()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });  //Later on,I must change this url to the deployed backend's url!!!!!!!!!!!!!!!!!
      console.log('User logged in:', response.data);
      setUser(response.data)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-yellow-500">
      <form className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Welcome back to StageBeam!</h2>
        <label className="block mb-4">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400"
        >
          Log In
        </button>
      </form>
    </div>
  );
};
