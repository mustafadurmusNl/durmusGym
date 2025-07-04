const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    street: { type: String },
    company: { type: String },
    vatNumber: { type: String },
    membershipType: {
      type: String,
      enum: ["monthly", "12months", "lifetime"],
      required: true,
    },
    isTempPassword: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Şifreyi kayıttan önce hashle
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
