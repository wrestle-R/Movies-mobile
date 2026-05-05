const appJson = require('./app.json');

module.exports = () => {
  const movieApiKey = process.env.EXPO_PUBLIC_MOVIE_API_KEY || process.env.TMDB_API_KEY || '';

  return {
    ...appJson,
    expo: {
      ...appJson.expo,
      extra: {
        ...(appJson.expo?.extra || {}),
        movieApiKey,
      },
    },
  };
};
