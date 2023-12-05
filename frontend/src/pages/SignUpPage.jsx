import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import { useNavigate, Navigate } from 'react-router';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { setToken, loadingUser, user } = useUserContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        {
          name,
          email,
          password,
        }
      );
      console.log('User signed up:', response.headers.authentication);
      localStorage.setItem('token', response.headers.authentication);
      setToken(response.headers.authentication);
    } catch (error) {
      console.error('Error signing up:', error.response.data.message);
    }
  };

  if (!loadingUser && user) return <Navigate to='/' />;

  return (
    <div className='flex justify-center items-center h-screen bg-yellow-500'>
      <div className='max-w-[60ch]'>
        <div
          className='text-sm hover:cursor-pointer text-left font-light mb-4'
          onClick={() => navigate(-1)}
        >
          {`<`} Go back
        </div>
        <form
          className='bg-white p-8 rounded shadow-md'
          onSubmit={handleSignUp}
        >
          <h2 className='text-2xl mb-4 text-center'>
            Welcome to our StageBeam Family!
          </h2>
          <label className='block mb-4'>
            Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </label>
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
          <button className='w-full bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
