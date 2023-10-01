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

router.post("/entrar", async (req, res) => {
  try {
    let { email, senha } = req.body;

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

router.post("/registrar", async (req, res) => {
  try {
    let user = req.body;
    user.dataRegistro = new Date();
    const userCreated = await User.create(user);
    User.senha = undefined;

    res.send({
      user: userCreated,
      token: generateToken({ id: userCreated.id }),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Registration User Failed" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    return res.status(400).send("Cant show user");
  }
});

router.patch("/senha/alterar/:id", authMiddleware, async (req, res) => {
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
