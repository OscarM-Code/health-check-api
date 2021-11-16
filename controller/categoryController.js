const CategoryModel = require("../model/Category");
const SiteModel = require("../model/Site");
const fetch = require("node-fetch");

exports.create = async (req, res) => {
    let cat = await CategoryModel.create({
        name: req.body.name
    });

    res.send(cat);
}

exports.findAll = async (req, res) => {
    const cats = await CategoryModel.find();
    console.log(cats);
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

exports.check = async (req, res) => {    
    let id = req.params.id;
    let cat = await CategoryModel.findById(id).populate("sites");
    let sites = cat.sites;
    sites.map(sites => {
        let link = sites.link;
        let method = sites.method;
        fetch(link, {
            method: method
        })
        .then(response => response.status)
        .then(test => {
            let health;
            if(test !== 404 && !test.toString().startsWith("5")){
                health = true;
            }else{
                health = false;
            }
            if(test !== sites.statusCode){
                SiteModel.updateOne({_id: sites._id}, {statusCode: test, health: health}, (er) => {
                    if(er){
                        console.log(er);
                    }
                })
            }
        }).catch(err => {
            SiteModel.updateOne({_id: sites._id}, {statusCode: 500, health: false}, (er) => {
                if(er){
                    console.log(er);
                }
            })
        })
        
    })

    res.status(200).json({
        message: "Request Check and Update", success: sites.length
    })
}