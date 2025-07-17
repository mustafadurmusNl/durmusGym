// server/middleware/validationMiddleware.js

const { validateRegistration } = require("../validators/userValidator");

const registrationValidationMiddleware = (req, res, next) => {
  const errors = validateRegistration(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(", "),
    });
  }

  next();
};

module.exports = {
  registrationValidationMiddleware,
};
