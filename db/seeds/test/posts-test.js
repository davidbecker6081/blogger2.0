exports.seed = (knex, Promise) => {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([
        {id: 1, author: 'author2', body: 'comment1', post_id: 1},
        {id: 2, author: 'author1', body: 'comment2', post_id: 4},
        {id: 3, author: 'author3', body: 'comment3', post_id: 4},
        {id: 4, author: 'author2', body: 'comment4', post_id: 5},
      ]);
    })
    .then(() => {
			console.log('Seeding is complete.');
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};
