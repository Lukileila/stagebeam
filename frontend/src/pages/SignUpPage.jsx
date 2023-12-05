import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

export const SignUpPage = () => {
  const { setToken } = useUserContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //to be reviewed:            when sshould I in this endpoint,change our url to backend deployment link url? const response = await axios.post('https://stagebeam.live/api/signup', { name, email, password });

  // to be reviewed:            const corsOptions = {
  //                            origin: 'https://stage-beam-front-end-url',

  //                             };

  // app.use(cors(corsOptions));
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

  return (
    <div className='flex justify-center items-center h-screen bg-yellow-500'>
      <form className='bg-white p-8 rounded shadow-md' onSubmit={handleSignUp}>
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
  );
};
