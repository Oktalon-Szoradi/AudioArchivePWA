import colors from 'colors';

const errorHandler = (err, req, res, next) => {
  console.log(colors.red(`Error ===> ${err.message}`));
  res.status(500).send('Server error');
  next();
};

const notFoundHandler = (req, res, next) => {
  console.log(colors.blue(`Not found ===> ${req.originalUrl}`));
  res.status(404).send('The ressource was not found on this server!');
  next();
};

export { errorHandler, notFoundHandler };
