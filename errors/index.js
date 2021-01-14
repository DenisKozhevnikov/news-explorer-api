const BadRequestError = require('./badRequestErr');
const ForbiddenError = require('./forbiddenErr');
const NotFoundError = require('./notFoundErr');
const UnathorizedError = require('./unauthorizedErr');
const ConflictError = require('./conflictErr');

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnathorizedError,
  ConflictError,
};
