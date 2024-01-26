import query from '../../db/index.js';

const getTest = () => query("SELECT 'This is just a test' as test");

const getMovies = () => query('SELECT * FROM movies;');

export { getTest, getMovies };
