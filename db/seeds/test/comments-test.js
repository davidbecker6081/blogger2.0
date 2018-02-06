exports.seed = (knex, Promise) => {
  return knex('posts').del()
    .then(() => {
      return knex('posts').insert([
        {id: 1, title: 'post1', body: 'body1', author: 'author1', '#_of_comments': 1},
        {id: 2, title: 'post2', body: 'body2', author: 'author1', '#_of_comments': 0},
        {id: 3, title: 'post3', body: 'body3', author: 'author2', '#_of_comments': 0},
        {id: 4, title: 'post4', body: 'body4', author: 'author2', '#_of_comments': 2},
        {id: 5, title: 'post5', body: 'body5', author: 'author3', '#_of_comments': 1}
      ]);
    })
    .then(() => {
			console.log('Seeding is complete.');
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};
