const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const cors = require('express-cors');

app.locals.title = 'Blogger2.0';

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  next();
});

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/posts', (request, response) => {
  return db('posts')
    .select()
    .then(posts => response.status(200).json(posts))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/comments/:post_id', (request, response) => {
  const post_id = request.params;

  return db('comments')
    .where(post_id)
    .select()
    .then(comments =>
      comments.length
        ? response.status(200).json(comments))
        : response.status(404).json({ error: 'No comments found for this post '})
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
