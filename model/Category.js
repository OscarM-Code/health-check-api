const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CategoryModelSchema = new Schema({
  name: {type: String},
  sites: [{type: mongoose.Schema.Types.ObjectId, ref: "SiteModel"}],
  user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
});

module.exports = mongoose.model('CategoryModel', CategoryModelSchema);