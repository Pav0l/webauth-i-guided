const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const md5 = require('md5');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
/*
REFACTOR THE CODE TO USE md5 hash function - BEWARE, IT IS NOT SECURE HASHING FUNCTION

1. install md5 library
2. on register, use md5 to compute a hash and save that has instead of the password


*/

  let user = req.body;
  let hashedPw = md5(user.password);
  user.password = hashedPw;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  let hashLoginPw = md5(password);

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user.password === hashLoginPw) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
