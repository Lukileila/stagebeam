const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ exposedHeaders: 'authentication' }));
app.use(express.json());

const jwtSecretKey = process.env.JWT_SECRET || 'defaultSecretKey';

const pool = new Pool();

// Password Hashing middleware
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Token verification middleware
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

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecretKey,
      { expiresIn: '1h' }
    );

    res.set('Authorization', token);
    return res.sendStatus(201);
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
      return res
        .status(400)
        .json({ message: 'Email and password are required for login' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (!result.rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { id, email: dbEmail, password: dbPassword } = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, dbPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: id, email: dbEmail }, jwtSecretKey, {
      expiresIn: '1h',
    });

    res.set('Authentication', token);
    return res.sendStatus(200);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json(error);
  }
});

// Returns one user based on the token that was sent by the frontend
app.get('/api/user', verifyToken, async (req, res) => {
  try {
    const { userId, email } = req.user;

    // getting all shows, whcih a user has
    const {rows:showsFromUser} = await pool.query(
      `SELECT shows.id as showId,
      shows.name as showname,
      array_agg(to_json(scenes.scenes)) as scenes FROM shows JOIN scenes ON scenes.showId=shows.id JOIN users ON users.id=shows.userId WHERE users.id=$1 OR email=$2 GROUP BY shows.id;`,
      [userId, email]
    );
    
    // Idk, why are are getting the stuff we already have. Maybe the user name isn't included in the token.
    const {rows:[user]}= await poolquery(
      `SELECT id, name, email FROM users WHERE users.id=$1 OR email=$2;`,
      [userId, email]
    );

    const parseShows = showFromUser.map((show) => ({
      ...show,
      scenes: show.scenes.map((scene)=>JSON.parse(scene)).flat(1),
    }));

    user.shows = parseShows;

    return res.json(user);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json(error);
  }
});

///

//Updates the shows list on the database
app.post(
  '/shows',
  /* verifyToken, */ async (req, res) => {
    try {
      const { userid } = req.body;
      const result = await pool.query('SELECT * FROM shows WHERE id = $1', [
        userid,
      ]);

      if (!result.rows.length) {
        return res.status(401).json({ message: 'Could not find that' });
      }

      /*  const { id: showid, name: showname, thumbnailURL:showthumbnailURL} = result.rows[0]; */
      const { id, name, thumbnailURL } = result.rows[0];
      return res.json({ id, name, thumbnailURL });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

//Updates one specific show on the database
app.post(
  '/show',
  /* verifyToken, */ async (req, res) => {
    try {
      const { shows } = req.body;

      const result = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);

      if (!result.rows.length) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const { id, email: dbEmail, name, password: dbPassword } = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, dbPassword);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: id, email: dbEmail }, jwtSecretKey, {
        expiresIn: '1h',
      });

      res.json({ id, email: dbEmail, name, token });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Returns a list of the shows a user has
app.get(
  '/shows',
  /* verifyToken, */ async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM shows');
      res.json({ users: result.rows });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

/* app.get('/shows',/* verifyToken, */ async (req, res) => {
  try {
    const { userid } = req.body;
    const result = await pool.query('SELECT * FROM shows WHERE id = $1', [
      userid,
    ]);

    if (!result.rows.length) {
      return res.status(401).json({ message: 'Could not find that' });
    }

    /*  const { id: showid, name: showname, thumbnailURL:showthumbnailURL} = result.rows[0]; */
    const { id, name, thumbnailURL } = result.rows[0];
    return res.json({ id, name, thumbnailURL });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Returns a specific show
app.get(
  '/show',
  /* verifyToken, */ async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json({ users: result.rows });
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

///

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
