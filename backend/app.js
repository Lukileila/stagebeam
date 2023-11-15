const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

//changesssss
//Middlewares:
app.use(cors()); // sets origin to all by default and thus enables Cross-Origin Resource Sharing (CORS)
app.use(express.json()); 

app.route('/').get((req, res) => {
  return res.json();
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}!`)
);