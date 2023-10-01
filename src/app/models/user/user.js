const mongoose = require("../../../../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  senha: {
    type: String,
    require: true,
    select: false,
  },
  contato: {
    whatsapp: {
      type: String,
      require: true,
    },
  },
  dataRegistro: {
    type: Date,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
