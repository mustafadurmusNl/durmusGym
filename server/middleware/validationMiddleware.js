// server/middleware/validationMiddleware.js

const {
  validateRegistration,
  sanitizeRegistration,
} = require("../validators/userValidator");

const registrationValidationMiddleware = (req, res, next) => {
  const errors = validateRegistration(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(", "),
    });
  }

  req.body = sanitizeRegistration(req.body);
  next();
};

module.exports = {
  registrationValidationMiddleware,
};
