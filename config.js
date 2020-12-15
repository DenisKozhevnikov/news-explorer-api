const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/newsexplorerdb',
  NODE_ENV,
  JWT_SECRET = 'SUPEROPTEXT',
} = process.env;

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  MONGO_OPTIONS,
  PORT,
  MONGO_URL,
  NODE_ENV,
  JWT_SECRET,
};
