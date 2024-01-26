import * as model from '../models/test.model.js';

const getTest = async (req, res) => {
  const { rows } = await model.getTest();
  if (!rows) return res.status(404).send('Ressource not found');
  return res.status(200).json(rows[0]);
};

const getMovies = async (req, res) => {
  const { rows } = await model.getMovies();
  if (!rows) return res.status(404).send('Ressource not found');
  return res.status(200).json(rows);
};

export { getTest, getMovies };
