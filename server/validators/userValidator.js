const validator = require("validator");

// Regex: Allows letters, spaces, apostrophes, hyphens (Turkish chars included)
const isValidName = (name) => /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s'-]{2,30}$/.test(name);

// Checks if string contains any HTML tags (e.g. <script>, <img>, etc.)
const hasHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

// Validates all registration input fields
const validateRegistration = (data) => {
  const errors = [];

  const {
    email = "",
    firstName = "",
    lastName = "",
    membershipType = "",
    company = "",
    vatNumber = "",
    street = "",
    country = "",
  } = data;

  // Email validation
  if (!validator.isEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  // First Name validation
  if (!isValidName(firstName)) {
    errors.push("Please enter a valid first name (letters and -' only).");
  } else if (hasHTML(firstName)) {
    errors.push("First name must not contain HTML tags.");
  }

  // Last Name validation
  if (!isValidName(lastName)) {
    errors.push("Please enter a valid last name (letters and -' only).");
  } else if (hasHTML(lastName)) {
    errors.push("Last name must not contain HTML tags.");
  }

  // Membership type validation
  const allowedMemberships = ["monthly", "12months", "lifetime"];
  if (!allowedMemberships.includes(membershipType)) {
    errors.push("Invalid membership type.");
  }

  // Basic HTML check for optional fields (company, vatNumber, etc.)
  if (hasHTML(company)) {
    errors.push("Company name must not contain HTML tags.");
  }

  if (hasHTML(vatNumber)) {
    errors.push("VAT number must not contain HTML tags.");
  }

  if (hasHTML(street)) {
    errors.push("Street address must not contain HTML tags.");
  }

  if (hasHTML(country)) {
    errors.push("Country must not contain HTML tags.");
  }

  return errors;
};

module.exports = {
  validateRegistration,
};
