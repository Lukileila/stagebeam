const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();


// posgresql DB: make sure no typooooossssss!!!  >>>>>> test starts here (agregar antes del numero de puerto talvez? "process.env.PORT ||"")
const port = 3000;







const pool = new Pool({
  user: 'efpymima',
  host: 'flora.db.elephantsql.com',
  database: 'efpymima',
  password: 'hBblMU3zU-yNB9m5czgC1UKKBxQYjTow',
});


// posgresql DB: make sure no typooooossssss!!!  >>>>>> test ends here





//global, later I can tailor more...middleware
app.use(bodyParser.json());


// test to connect, use postman !!!!    :









app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'all fields are required!!!' });
  }

  try {
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//now tesst for GET requests: TEST ONLY!!!!


app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//now tesst for GET requests: TEST ONLY!!!!


app.listen(port, () => {
  console.log(`Server is jumping on port ${port}`);
});
