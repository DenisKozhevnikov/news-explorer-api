const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateCreateUserBody, validateAuthBody } = require('../middlewares/validation');
const { NotFoundError } = require('../errors');

router.post('/signup', validateCreateUserBody, createUser);
router.post('/signin', validateAuthBody, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
