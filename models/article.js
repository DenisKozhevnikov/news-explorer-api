const { Schema, model } = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleSchema = new Schema(
  {
    keyword: {
      type: String,
      required: [true, 'Поле "Ключевое слово" должно быть заполнено'],
    },
    title: {
      type: String,
      required: [true, 'Поле "Заголовок" должно быть заполнено'],
    },
    text: {
      type: String,
      required: [true, 'Поле "Текст" должно быть заполнено'],
    },
    date: {
      type: String,
      required: [true, 'Поле "Дата" должно быть заполнено'],
    },
    source: {
      type: String,
      required: [true, 'Поле "Источник" должно быть заполнено'],
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
        message: 'Неправильно указана ссылка',
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
        message: 'Неправильно указана ссылка',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле "Id пользователя" должно быть заполнено'],
    },
  },
);

module.exports = model('article', articleSchema);
