import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

export const LogInPage = () => {
  const navigate = useNavigate();
  const { setToken, loadingUser, user } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      ); //Later on,I must change this url to the deployed backend's url!!!!!!!!!!!!!!!!!
      console.log('User logged in:', response.headers.authentication);
      localStorage.setItem('token', response.headers.authentication);
      setToken(response.headers.authentication);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
    }
  };

  if (!loadingUser && user) return <Navigate to='/' />;

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-yellow-500'>
      <div className='max-w-[60ch]'>
        <div
          className='text-sm hover:cursor-pointer text-left font-light mb-4'
          onClick={() => navigate(-1)}
        >
          {`<`} Go back
        </div>
        <form onSubmit={handleLogin} className='bg-white p-8 rounded shadow-md'>
          <h2 className='text-2xl mb-4 text-center'>
            Welcome back to StageBeam!
          </h2>
          <label className='block mb-4'>
            Email:
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </label>
          <label className='block mb-4'>
            Password:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </label>
          <button className='w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
