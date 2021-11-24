const SiteModel = require("../model/Site");
const CategoryModel = require("../model/Category");
const UserModel = require("../model/User");
const fetch = require("node-fetch");

exports.create = async (req, res) => {
	
	SiteModel.findOneAndUpdate({link: req.body.link, user: req.decoded.userId, method: req.body.method}, {name: req.body.name}, async (err, stat) => {
        console.log(err);
        console.log(stat);
        if(err){
            return res.status(400).json({
                message: "An error was occured", success: 0, status: 400
            })
        } else {
            if(!stat){                
				let health;
				let statusCode;
				await fetch(req.body.link, {method: req.body.method})
					.then(res => res.status)
					.then(status => {
						if(status !== 404 && !status.toString().startsWith("5")){
							health = true;
						}else{
							health = false;
						}
						statusCode = status;
					}).catch(err => {
						health = false;
						statusCode = 500;
					})
				const link = new SiteModel({
							link: req.body.link,
							method: req.body.method,
							statusCode: statusCode,
							health: health,
							category: req.body.category,
							user: req.decoded.userId
						})
				await link.save()
				CategoryModel.findOneAndUpdate({_id: req.body.category}, {$push : {sites: link._id}}, (err) => {
					if(err){
						return res.send({
							message: "An error was occured", success: 0, status: 400
						})
					}
				});
				UserModel.findOneAndUpdate({_id: req.decoded.userId}, {$push : {sites: link._id}}, (err) => {
					if(err){
						return res.send({
							message: "An error was occured", success: 0, status: 400
						})
					}
				});
				res.send({
					link, success: 1, status: 200
				})
            } else {
                res.status(400).send({
                    message: "Request already exists.", success: 0, status: 400
                })
            }
        }
    })
}

exports.findAll = async (req, res) => {
    const links = await SiteModel.find()
	res.send(links)
}

exports.findOne = (req, res) => {
	const id = req.params.id;
	SiteModel.findById(id, (er, site) => {
		if(er){
			res.send(er)
		}
		res.send(site)
	})
}

exports.update = async (req, res) => {
	const id = req.params.id;
	const cat = req.body && req.body.category ? req.body.category : null;
	const newCat = req.body && req.body.newCategory ? req.body.newCategory : null;

	if(cat !== newCat && newCat){
		CategoryModel.findOneAndUpdate({_id: cat}, {$pull : {sites: id}}, (err) => {
			if(err){
				if(er){
					return res.status(400).json({
						message: "An error was occured", success: 0, status: 400
					})
				}
			}
		});
		CategoryModel.findOneAndUpdate({_id: newCat}, {$push : {sites: id}}, (err) => {
			if(err){
				if(er){
					return res.status(400).json({
						message: "An error was occured", success: 0, status: 400
					})
				}
			}
		});
	}

	let health;
	let statusCode;
	await fetch(req.body.link, {method: req.body.method})
		.then(res => res.status)
		.then(status => {
			if(status !== 404 && !status.toString().startsWith("5")){
				health = true;
			}else{
				health = false;
			}
			statusCode = status;
		}).catch(err => {
			health = false;
			statusCode = 500;
		})

	SiteModel.findById(id, (er, site) => {
		if(er){
			res.send(er)
		}

		site.link = req.body.link ? req.body.link : site.link;
		site.method = req.body.method ? req.body.method : site.method;
		site.statusCode = statusCode;
		site.health = health;
		site.category = newCat ? newCat : site.category;

		site.save((er) => {
			if(er){
				return res.status(400).json({
					message: "An error was occured", success: 0, status: 400
				})
			}
			res.status(200).json({
				message: "Link modified.", success: 1, status: 200
			})
		})
	})
}

exports.delete = async (req, res) => {
	const id = req.params.id;
	
	await CategoryModel.findOneAndUpdate({_id: req.body.category}, {$pull : {sites: req.params.id}}, (err) => {
		if(err){
			if(er){
				return res.status(400).json({
					message: "An error was occured", success: 0, status: 400
				})
			}
		}
	}).clone().catch(function(err){ console.log(err)});
	UserModel.findOneAndUpdate({_id: req.decoded.userId}, {$pull : {sites: id}}, (err) => {
		if(err){
			if(er){
				return res.status(400).json({
					message: "An error was occured", success: 0, status: 400
				})
			}
		}
	});
	SiteModel.deleteOne({_id: id}, (er, link) => {
		if(er){
			if(er){
				return res.status(400).json({
					message: "An error was occured", success: 0, status: 400
				})
			}
		}
		res.status(200).json({
			message: "Link deleted.", success: 1, status: 200
		})
	})
}