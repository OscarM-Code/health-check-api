const CategoryModel = require("../model/Category");
const SiteModel = require("../model/Site");
const UserModel = require("../model/User");
const fetch = require("node-fetch");

exports.create = async (req, res) => {
    console.log(req.decoded);

    let cat = await CategoryModel.create({
        name: req.body.name,
        user: req.decoded.userId
    });

    res.send(cat);
}

exports.findAll = async (req, res) => {
    const cats = await CategoryModel.find();

    res.send(cats);
}

exports.findOne = (req, res) => {
    let id = req.params.id;
    CategoryModel.findById(id, (er, cat) => {
        if(er){
            res.send(er);
        }
        res.send(cat)
    }).populate("sites");
}

exports.update = (req, res) => {
    let id = req.params.id;
    CategoryModel.updateOne({_id: id}, {name: req.body.name}, (er) => {
        if(er){
            res.send(er);
        }
        res.status(200).json({
			message: "Category name modified.", success: 1
		})
    })
}

exports.delete = async (req, res) => {
    let id = req.params.id;
    CategoryModel.findOne({_id: id}, (er, cat) => {
        if(er){
            console.log(er);
        }
        cat.sites.map(site => {
            SiteModel.deleteOne({_id: site}, (er) => {
                if(er){
                    console.log(er);
                }
            })
        })
    })
    CategoryModel.deleteOne({_id: id},(er) => {
        if(er){
            res.send(er);
        }
        res.status(200).json({
			message: "Category deleted.", success: 1
		})
    })
}

exports.findAllForUser = async (req, res) => {    
    let userId = req.decoded.userId;

    const cats = await CategoryModel.find({user: userId});

    res.send(cats);
}