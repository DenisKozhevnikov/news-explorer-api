const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  BadRequestError, // 400
  NotFoundError, // 404
  ConflictError, // 409
} = require('../errors');
const { JWT_SECRET } = require('../config');

const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный формат id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь уже существует');
      }

      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((data) => res.send({
          data: {
            name: data.name,
            email: data.email,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(err.message));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        ),
      });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
