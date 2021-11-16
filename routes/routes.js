const express = require("express")
const siteController = require("../controller/siteController")
const categoryController = require("../controller/categoryController")
const userController = require("../controller/userController")
const auth = require("../middleware/auth")
const site = require("../middleware/site")
const category = require("../middleware/category")
const router = express.Router()


router.route("/links")
.get(auth.verifyToken, auth.checkAdmin, siteController.findAll)
.post(auth.verifyToken, siteController.create)

router.route("/user/:userId/links/:id")
.get(auth.verifyToken, site.checkLinksOfUser, siteController.findOne)
.put(auth.verifyToken, site.checkLinksOfUser, siteController.update)
.delete(auth.verifyToken, site.checkLinksOfUser, siteController.delete)

router.route("/categories")
.get(auth.verifyToken, auth.checkAdmin, categoryController.findAll)
.post(auth.verifyToken, categoryController.create)

router.route("/userCategories/")
.get(auth.verifyToken, categoryController.findAllForUser)

router.route("/user/:userId/categories/:id")
.get(auth.verifyToken, category.checkCategoryOfUser, categoryController.findOne)
.put(auth.verifyToken, category.checkCategoryOfUser, categoryController.update)
.delete(auth.verifyToken, category.checkCategoryOfUser, categoryController.delete)

router.route("/register")
.post(userController.createUser)

router.route("/login")
.post(userController.loginUser)


module.exports = router