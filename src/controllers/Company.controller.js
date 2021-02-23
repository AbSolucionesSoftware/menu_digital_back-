const companyCtrl = {};
const modelCompany = require('../models/Company');
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");

companyCtrl.createCompany = async (req,res) => {
    try {
        const { password, repeatPassword } = req.body;
        console.log(req.body);
        const newCompany = new modelCompany(req.body);
        newCompany.public = false;
        newCompany.type = false;
        if(!password || !repeatPassword){
            res.status(404).json({ message: "Las contrasenas son obligatorias." });
        } else {
            if(password !== repeatPassword){
                res.status(404).json({ message: "Las contrasenas no son iguales." });
            } else {
                bcrypt.hash(password, null, null, function (err, hash){
                    if(err){
                        res.status(500).json({message: "Ups, algo paso al registrar el usuario",err,});
                    } else {
                        newCompany.password = hash;
                        newCompany.save((err, userStored) => {
                            if (err) {
                              res
                                .status(500)
                                .json({
                                  message: "Ups, algo paso al registrar el usuario",
                                  err,
                                });
                            } else {
                              if (!userStored) {
                                res.status(404).json({ message: "Error al crear el usuario" });
                              } else {
                                res.status(200).json({message: "Usuario agregado."});
                              }
                            }
                          })
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.editCompany = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.getCompany = async (req,res) => {
    try {
        const companys = modelCompany.find({});
        res.status(200).json(companys);
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.deleteCompany = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.inicioSesion = async (req,res) => {
    try {
        const { nameUser, password } = req.body;
        const userBase = await modelCompany.findOne({nameUser: nameUser});
        if(userBase){
            if(userBase.public == false){
                res.status(500).json({message: "Este usuario no esta activo."});
            }else{
                const token = jwt.sign(
                    {
                      nameCompany: userStored.nameCompany,
                      nameUser: userStored.nameUser,
                      public: userStored.public,
                      owner: userStored.owner,
                      phone: userStored.phone,
                      type: userStored.type,
                    },
                    process.env.AUTH_KEY
                  );
            }
        }else{
            res.status(404).json({message: "Este usuario no existe."});
        }
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

module.exports = companyCtrl;