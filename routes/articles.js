const router = require('express').Router();
const {
  getUserArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const { validateCreateArticleBody, validateDeleteArticleParams } = require('../middlewares/validation');

router.get('/', getUserArticles);
router.post('/', validateCreateArticleBody, createArticle);
router.delete('/:articleId', validateDeleteArticleParams, deleteArticle);

module.exports = router;
