const express = require("express");
const User = require("../models/user/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../../../config/auth.json");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 84600 });
}

router.post("/perfil/registrar", async (req, res) => {
  try {
    const user = await User.create(req.body);
    User.senha = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Registration User Failed" });
  }
});

router.get("/perfil/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    return res.status(400).send("Cant show user");
  }
});

router.patch("/perfil/senha/alterar/:id", authMiddleware, async (req, res) => {
  try {
    let { senha } = req.body;
    senha = await bcrypt.hash(senha, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { senha },
      { new: true }
    );
    res.status(200).send(user);
  } catch (err) {
    return res.status(400).send({ error: "Cant update user password" });
  }
});

module.exports = router;
