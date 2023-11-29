const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// Hash password function
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

///////   Must check what port number ----is cors well installed?

const pool = new Pool();
/////

// endpoint sign up/ new user registratioon:


app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!!!' });
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: error.message });
  }
});

//  endpoint  for login test!!!!!!!!!!!


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required for login' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (!result.rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const {id, email: dbEmail, name, password: dbPassword} = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, dbPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ id, email: dbEmail, name });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// endpoint get all
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




