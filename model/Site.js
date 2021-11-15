const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SiteModelSchema = new Schema({
  link: {type: String},
  method: {type: String},
  statusCode: {type: Number},
  health: {type: Boolean},
  category: {type: mongoose.Schema.Types.ObjectId, ref: "CategoryModel"},
});

module.exports = mongoose.model('SiteModel', SiteModelSchema );