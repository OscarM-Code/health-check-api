const SiteModel = require("../model/Site");
const CategoryModel = require("../model/Category");
const UserModel = require("../model/User");
const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
    try {

        const { email, password, first_name, last_name } = req.body;

        if(!(email && password && first_name && last_name)){
            return res.status(400).send({
                message: "Vous devez remplir tout les champs."
            });
        }

        const oldUser = await UserModel.findOne({ email });

        if(oldUser){
            return res.status(400).send({
                message: "L'utilisateur existe déjà"
            });
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = UserModel.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "ROLE_USER",
            first_name,
            last_name,
        })

        const token = jwt.sign(
            { userId: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;

        res.status(200).send({
            user,
            statusCode: 200,
        });

    } catch (error) {

        res.status(400).json({
            status: "error",
            message: error.message,
        });

    }
}

exports.loginUser = async (req, res) => {
    
    try {

        const { email, password } = req.body;

        if(!(email && password)){
            return res.status(400).send({
                message: "Vous devez remplir tout les champs"
            });
        }

        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(400).send({
                message: "L'utilisateur n'existe pas"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).send({
                message: "Mauvais mot de passe"
            });
        }

        const token = jwt.sign(
            { userId: user._id, email, role: user.role, first_name: user.first_name, last_name: user.last_name, categories: user.categories },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;

        let thisUser = {
            token: user.token,
            id: user._id,
        }

        return res.status(200).send({
            thisUser, 
            status: 200
        });

    } catch (error) {
            
            return res.status(400).send({
                status: "error",
                message: error.message,
            });
    
        }

}