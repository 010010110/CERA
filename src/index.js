const express = require("express");
const userController = require("../src/app/controller/userController");
const authController = require("../src/app/controller/authController");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/user", userController);

app.use("/auth", authController);

app.listen(3333);
