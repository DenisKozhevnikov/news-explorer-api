require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const { PORT, MONGO_URL, MONGO_OPTIONS } = require('./config');

const app = express();

mongoose.connect(MONGO_URL, MONGO_OPTIONS);

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
