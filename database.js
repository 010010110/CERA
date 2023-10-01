const mongoose = require("mongoose");

mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
