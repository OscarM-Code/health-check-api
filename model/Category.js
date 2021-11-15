const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CategoryModelSchema = new Schema({
  name: {type: String},
  sites: [{type: mongoose.Schema.Types.ObjectId, ref: "SiteModel"}],
});

module.exports = mongoose.model('CategoryModel', CategoryModelSchema);