const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateCreateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Неправильно указана ссылка на статью');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Неправильно указана ссылка на картинку');
    }),
  }),
});

const validateDeleteArticleParams = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});

const validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().trim().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateAuthBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().trim().min(8),
  }),
});

module.exports = {
  validateCreateArticleBody,
  validateDeleteArticleParams,
  validateCreateUserBody,
  validateAuthBody,
};
