const CategoryModel = require("../model/Category");
const SiteModel = require("../model/Site");
const UserModel = require("../model/User");
const fetch = require("node-fetch");

exports.create = async (req, res) => {

    CategoryModel.findOneAndUpdate({name: req.body.name, user: req.decoded.userId}, {name: req.body.name}, async (err, stat) => {

        if(err){
            return res.status(400).json({
                message: "Une erreur est survenue.", success: 0, status: 400
            })
        } else {
            if(!stat){
                let cat = await CategoryModel.create({
                    name: req.body.name,
                    user: req.decoded.userId
                });
            
                UserModel.findOneAndUpdate({_id: req.decoded.userId}, {$push : {categories: cat._id}}, (er) => {
                    if(er){
                        return res.send({
                            message: "Une erreur est survenue.", success: 0, status: 400
                        })
                    }
                });
            
                res.send({
                    cat, success: 1, status: 200
                });
            } else {
                res.status(400).send({
                    message: "La catégorie existe déjà", success: 0, status: 400
                })
            }
        }
    })
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
            res.send({er, success: 0, status: 400});
        }
        res.status(200).send({
			message: "Category modifiée.", success: 1, status: 200
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
        res.status(200).send({
			message: "Category supprimée.", success: 1, status: 200
		})
    })
    UserModel.findOneAndUpdate({_id: req.decoded.userId}, {$pull : {categories: id}}, (err) => {
        if(err){
            if(er){
                return res.status(400).send({
                    message: "Une erreur est survenue.", success: 0, status: 400
                })
            }
        }
    });
}

exports.findAllForUser = async (req, res) => {    
    let userId = req.decoded.userId;

    const cats = await CategoryModel.find({user: userId});

    res.send(cats);
}