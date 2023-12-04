const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const jwtSecretKey = process.env.JWT_SECRET || 'defaultSecretKey';


const pool = new Pool();

// Password Hashing
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// api/signup receives User data and returns a token
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!!!' });
    }
// current frontend signup endpoint code:

//        app.use(cors(corsOptions));
//        const handleSignUp = async () => {
//        try {
  //      const response = await axios.post('/api/signup', { name, email, password });
 //       console.log('User signed up:', response.data.user);
//        } catch (error) {
//        console.error('Error signing up:', error.response.data.message);
 //         }
//          };









    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecretKey, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: error.message });
  }
});

// login receives credentials and returns user data andd token
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

    const { id, email: dbEmail, name, password: dbPassword } = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, dbPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: id, email: dbEmail }, jwtSecretKey, { expiresIn: '1h' });

    res.json({ id, email: dbEmail, name, token });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Returns all users. Not sure what this is used for /LZ
app.get('/api/users', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




///



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

    const { id, email: dbEmail, name, password: dbPassword } = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, dbPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: id, email: dbEmail }, jwtSecretKey, { expiresIn: '1h' });

    res.json({ id, email: dbEmail, name, token });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Returns the shows a user has
app.get('/shows', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Returns a specific show
app.get('/show', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





///


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
