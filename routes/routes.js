const express = require("express")
const siteController = require("../controller/siteController")
const categoryController = require("../controller/categoryController")
const router = express.Router()


router.route("/links")
.get(siteController.findAll)
.post(siteController.create)

router.route("/links/:id")
.get(siteController.findOne)
.put(siteController.update)
.delete(siteController.delete)

router.route("/categories")
.get(categoryController.findAll)
.post(categoryController.create)

router.route("/categories/:id")
.get(categoryController.findOne)
.post(categoryController.check)
.put(categoryController.update)
.delete(categoryController.delete)


module.exports = router