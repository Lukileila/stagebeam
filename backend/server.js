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

app.post('/show', async (req, res) => {
  try {
    const { rows } = await pool.query('INSERT INTO shows (name, userid) ');
    // const {
    //   rows: [user],
    // } = await pool.query('SELECT * FROM shows WHERE id=$1', [req.params.id]);
    return res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

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
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Returns one user based on the token that was sent by the frontend
app.get('/api/user', verifyToken, async (req, res) => {
  try {
    const { userId, email } = req.user;

    const {
      rows: [user],
    } = await pool.query(
      `SELECT users.id, email, users.name as username, shows.name as showname, scenes as shows FROM users JOIN shows ON users.id = shows.userId WHERE users.id=$1 OR email=$2;`,
      [userId, email]
    );

    return res.json(user);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    console.log('sup');
    const {
      rows: [user],
    } = await pool.query(
      `SELECT shows.id as showId, shows.name as showname, array_agg(to_json(scenes.*)) as scenes FROM shows JOIN scenes ON scenes.showId=shows.id GROUP BY shows.id;`
    );

    /*
    `SELECT users.id as userid, email, users.name as username, array_agg(to_json(shows.*)) as shows FROM users JOIN shows ON users.id = shows.userId WHERE users.id=$1 GROUP BY users.id;`,
    `SELECT users.id as userid, email, users.name as username, array_agg(to_json(shows.* )) as shows FROM users JOIN shows ON users.id = shows.userId JOIN scenes ON scenes.showId=shows.id WHERE users.id=$1 GROUP BY users.id;`
    */

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

// '[{"templateId":1,"name":"spotlight","thumbnail":"https://images.ctfassets.net/vu8gu00g7wzj/6KcbZlBdfZjNksZlPxcrHl/47fc17619798e6d316a48d0b33f0688d/spotlight.png","position":{"rx":0.06486518712831443,"ry":0.22723900370959194},"size":0.12,"opacity":0.9,"edgeHardness":0.27,"color":"#ffffff","controls":[{"type":"range","property":"size","label":"Size"},{"type":"range","property":"opacity","label":"Opacity"},{"type":"range","property":"edgeHardness","label":"edge Hardness"},{"type":"color","property":"color","label":"Color"}],"elements":[{"css":{"backgroundColor":"#FFFEF5","aspectRatio":"1","borderRadius":"50%","translate":"-50% -50%"},"size":1}],"id":"spotlight_812acbe0-afae-4cd5-b9d4-7d40cc23edcc"},{"templateId":1,"name":"spotlight","thumbnail":"https://images.ctfassets.net/vu8gu00g7wzj/6KcbZlBdfZjNksZlPxcrHl/47fc17619798e6d316a48d0b33f0688d/spotlight.png","position":{"rx":0.49030450270520026,"ry":0.23232644409114997},"size":0.25,"opacity":0.9,"edgeHardness":0.34,"color":"#ffffff","controls":[{"type":"range","property":"size","label":"Size"},{"type":"range","property":"opacity","label":"Opacity"},{"type":"range","property":"edgeHardness","label":"edge Hardness"},{"type":"color","property":"color","label":"Color"}],"elements":[{"css":{"backgroundColor":"#FFFEF5","aspectRatio":"1","borderRadius":"50%","translate":"-50% -50%"},"size":1}],"id":"spotlight_a271993a-f945-4aa8-a076-951e957a48b9"},{"templateId":1,"name":"spotlight","thumbnail":"https://images.ctfassets.net/vu8gu00g7wzj/6KcbZlBdfZjNksZlPxcrHl/47fc17619798e6d316a48d0b33f0688d/spotlight.png","position":{"rx":0.9090665196071125,"ry":0.24250132485426604},"size":0.12,"opacity":0.9,"edgeHardness":0.27,"color":"#ffffff","controls":[{"type":"range","property":"size","label":"Size"},{"type":"range","property":"opacity","label":"Opacity"},{"type":"range","property":"edgeHardness","label":"edge Hardness"},{"type":"color","property":"color","label":"Color"}],"elements":[{"css":{"backgroundColor":"#FFFEF5","aspectRatio":"1","borderRadius":"50%","translate":"-50% -50%"},"size":1}],"id":"spotlight_72b779d5-972d-4044-ac3f-6db9a9c96c23"},{"templateId":1,"name":"spotlight","thumbnail":"https://images.ctfassets.net/vu8gu00g7wzj/6KcbZlBdfZjNksZlPxcrHl/47fc17619798e6d316a48d0b33f0688d/spotlight.png","position":{"rx":0.2518295500275737,"ry":0.21536830948595653},"size":0.22,"opacity":0.9,"edgeHardness":0.27,"color":"#ffffff","controls":[{"type":"range","property":"size","label":"Size"},{"type":"range","property":"opacity","label":"Opacity"},{"type":"range","property":"edgeHardness","label":"edge Hardness"},{"type":"color","property":"color","label":"Color"}],"elements":[{"css":{"backgroundColor":"#FFFEF5","aspectRatio":"1","borderRadius":"50%","translate":"-50% -50%"},"size":1}],"id":"spotlight_756a0beb-8c4c-4e89-b871-f4972044d139"},{"templateId":1,"name":"spotlight","thumbnail":"https://images.ctfassets.net/vu8gu00g7wzj/6KcbZlBdfZjNksZlPxcrHl/47fc17619798e6d316a48d0b33f0688d/spotlight.png","position":{"rx":0.7268716557614058,"ry":0.23910969793322734},"size":0.22,"opacity":0.9,"edgeHardness":0.27,"color":"#ffffff","controls":[{"type":"range","property":"size","label":"Size"},{"type":"range","property":"opacity","label":"Opacity"},{"type":"range","property":"edgeHardness","label":"edge Hardness"},{"type":"color","property":"color","label":"Color"}],"elements":[{"css":{"backgroundColor":"#FFFEF5","aspectRatio":"1","borderRadius":"50%","translate":"-50% -50%"},"size":1}],"id":"spotlight_92acf7a2-f8c4-421a-89b6-02b0b5db2627"}]'
