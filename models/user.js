const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { UnathorizedError } = require('../errors');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "Электронная почта" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Необходимо ввести корректный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Поле "Имя" должно быть заполнено'],
      minlength: [2, 'Минимальное количество знаков - 2'],
      maxlength: [30, 'Максимальное количество знаков - 30'],
    },
  },
);

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
