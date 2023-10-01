const express = require("express");
const userController = require("../src/app/controller/userController");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/perfil", userController);

app.listen(3333);
