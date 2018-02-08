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

app.post('/api/v1/posts', (request, response) => {
  const post = response.body;
  const keys = ['title', 'body', 'author', '#_of_comments'];

  for (const requiredParameter of keys) {
    if (!post[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { 'title': <string>, 'body': <string>, 'author': <string>, '#_of_comments': <integer> }.  You are missing a ${requiredParameter} property.`
      });
    }
  }

  return db('posts')
    .insert(post, '*')
    .then(post => response.status(201).json(post))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/comment', (request, response) => {
  const comment = request.body;
  const keys = ['author', 'body', 'post_id'];

  for (const requiredParameter of keys) {
    if (!comment[requiredParameter]) {
      return response.status(422).send({
          error: `Expected format: { 'author': <string>, 'body': <string>, 'post_id': <integer> }.  You are missing a ${requiredParameter} property.`
      });
    }
  }

  return db('comments')
    .insert(comment, '*')
    .then(comment => response.status(201).json(comment))
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
