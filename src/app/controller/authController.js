const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user/user");
const authConfig = require("../../../config/auth.json");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 84600 });
}

router.post("/entrar", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select("+senha");

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    if (!(await bcrypt.compare(senha, user.senha))) {
      return res.status(400).json({ message: "invalid Login" });
    }

    res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    res.status(400).send({ error: "cant authenticate" });
  }
});

module.exports = router;
