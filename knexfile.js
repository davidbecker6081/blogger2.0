module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/blogger",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  },

  test: {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/blogger_test",
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./db/seeds/test"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  }
};
