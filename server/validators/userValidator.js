// server/validators/userValidator.js

const validator = require("validator");

// Regex ile sadece harf ve bazı özel karakterler kontrolü
const isValidName = (name) => /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s'-]{2,30}$/.test(name);

const validateRegistration = (data) => {
  const errors = [];

  if (!validator.isEmail(data.email || "")) {
    errors.push("Geçerli bir email adresi giriniz.");
  }

  if (!isValidName(data.firstName)) {
    errors.push("Geçerli bir isim giriniz (sadece harf ve -').");
  }

  if (!isValidName(data.lastName)) {
    errors.push("Geçerli bir soyisim giriniz.");
  }

  if (!["monthly", "12months", "lifetime"].includes(data.membershipType)) {
    errors.push("Geçersiz üyelik tipi.");
  }

  return errors;
};

// XSS koruması — basit HTML tag'leri temizleme
const sanitizeInput = (str) => {
  return str?.replace(/<[^>]*>?/gm, "").trim();
};

const sanitizeRegistration = (data) => {
  return {
    ...data,
    firstName: sanitizeInput(data.firstName),
    lastName: sanitizeInput(data.lastName),
    email: sanitizeInput(data.email),
    company: sanitizeInput(data.company),
    vatNumber: sanitizeInput(data.vatNumber),
    street: sanitizeInput(data.street),
    country: sanitizeInput(data.country),
  };
};

module.exports = {
  validateRegistration,
  sanitizeRegistration,
};
