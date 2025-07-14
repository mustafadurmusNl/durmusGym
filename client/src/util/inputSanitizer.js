// inputSanitizer.js
export const isValidName = (name) =>
  /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s'-]{2,30}$/.test(name);

export const sanitizeInput = (input) => {
  const temp = document.createElement("div");
  temp.textContent = input;
  return temp.innerHTML;
};

export const sanitizeFormData = (data) => {
  const sanitized = {};
  for (const key in data) {
    sanitized[key] = sanitizeInput(data[key]);
  }
  return sanitized;
};
