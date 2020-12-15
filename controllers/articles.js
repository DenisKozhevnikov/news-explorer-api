const Article = require('../models/article');
const {
  BadRequestError, // 400
  ForbiddenError, // 403
  NotFoundError, // 404
} = require('../errors');

const getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    owner: req.user._id,
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  })
    .then((article) => {
      res.send({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError('Статья не найдена');
    })
    .then((article) => {
      if (req.user._id !== article.owner.toString()) {
        throw new ForbiddenError('Не надо пытаться удалять чужие статьи');
      }
      article.deleteOne()
        .then(() => {
          res.send({ message: 'Статья была удалена' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный формат id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserArticles,
  createArticle,
  deleteArticle,
};
