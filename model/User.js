const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserModelSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "ROLE_USER" },
    token: { type: String },
    sites: [{type: mongoose.Schema.Types.ObjectId, ref: "SiteModel"}],
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: "CategoryModel"}],
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserModel', UserModelSchema);