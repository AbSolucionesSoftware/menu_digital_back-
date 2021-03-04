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

companyCtrl.createCompanyAdmin = async (req,res) => {
    try {
        const { password, repeatPassword } = req.body;
        console.log(req.body);
        const newCompany = new modelCompany(req.body);
        newCompany.public = false;
        newCompany.type = true;
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
        const { nameCompany, owner, phone } = req.body;
        const newCompany = {
            nameCompany: nameCompany,
            owner: owner,
            phone: phone
        }
        await modelCompany.findByIdAndUpdate(req.params.idCompany,newCompany);
        const newCompanyBase = await modelCompany.findById(req.params.idCompany);
        const token = jwt.sign(
            {
              _id: newCompanyBase._id,
              nameCompany: newCompanyBase.nameCompany,
              nameUser: newCompanyBase.nameUser,
              public: newCompanyBase.public,
              owner: newCompanyBase.owner,
              phone: newCompanyBase.phone,
              type: newCompanyBase.type,
            },
            process.env.AUTH_KEY
          );
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.resetPassCompany = async (req,res) => {
    try {
        const { password, repeatPassword } = req.body;

        if(password !== repeatPassword){
            res.status(404).json({ message: "Las contrasenas no son iguales." });
        } else {
            bcrypt.hash(password, null, null, async function (err, hash){
                if(err){
                    res.status(500).json({message: "Ups, algo paso al registrar el usuario",err,});
                } else {
                    await modelCompany.findByIdAndUpdate(req.params.idCompany,{password: hash});
                    res.status(200).json({message: "Usuario actualizado."});
                }
            })
        }

    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.getCompanys = async (req,res) => {
    try {
        const companys = await modelCompany.find({});
        res.status(200).json(companys);
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.getCompany = async (req,res) => {
    try {
        const companys = await modelCompany.findById(req.params.idCompany);
        res.status(200).json(companys);
    } catch (error) {
        res.status(500).json({message: "Error del server", error})
        console.log(error);
    }
}

companyCtrl.deleteCompany = async (req,res) => {
    try {
        const company = await modelCompany.findById(req.params.idCompany);
        
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
                if (!bcrypt.compareSync(password, userBase.password)) {
                    res.status(404).json({ message: "Contraseña incorrecta" });
                  } else {
                    const token = jwt.sign(
                        {
                          _id: userBase._id,
                          nameCompany: userBase.nameCompany,
                          nameUser: userBase.nameUser,
                          public: userBase.public,
                          owner: userBase.owner,
                          phone: userBase.phone,
                          type: userBase.type,
                        },
                        process.env.AUTH_KEY
                      );
                    //token
                    res.status(200).json({ token });
                  }
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