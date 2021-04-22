const classificationCtrl = {};
const classificationModel = require("../models/Classification");

classificationCtrl.createClassification = async (req,res) => {
    try {
        const { type } = req.body;
        const typeClass = new classificationModel({ idCompany: req.params.idCompany, type: type });
        typeClass.save(async (err, response) => {
            if(err){
                res.status(500).json({ message: 'Ups, algo paso al agregar.', err });
            } else {
                if(!response){
                    res.status(404).json({ message: 'Error al agregar.' });
                }else{
                    res.status(200).json({ message: 'Agregado correctamente.', data: response });
                }
            }
        });
        // res.status(200).json({message: ""});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.getClassification = async (req,res) => {
    try {
        const classTypes = await classificationModel.find({idCompany: req.params.idCompany});
        res.status(200).json(classTypes);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.updateClassification = async (req,res) => {
    try {
        const { type } = req.body;
        // const categories = await CategoriesModel.find({idCompany: req.params.idCompany});
        await classificationModel.findByIdAndUpdate(req.params.idCategory,{type});
        res.status(200).json({message: "Editado correctamente."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.deleteClassification = async (req,res) => {
    try {
        const categories = await CategoriesModel.findById(req.params.idCategory);
        if(categories.subCategories.length > 0){
            res.status(500).json({message: "Esta categoria aun tiene sub categorias, no se puede eliminar."})
        }else{
            await CategoriesModel.findByIdAndDelete(req.params.idCategory);
            res.status(200).json({message: "Eliminado correctamente."});
        }
        // res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.agregateSubClassification = async (req,res) => {
    try {
        const {subCategory} = req.body;
        await CategoriesModel.updateOne(
            {
                _id: req.params.idCategory
            },
            {
                $addToSet: {
					subCategories: {
						subCategories: subCategory,
					}
				}
            }
        );
        res.status(200).json({message: "Sub categoria agregada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.updateSubClassification = async (req,res) => {
    try {
        const { subCategory } = req.body;
        await CategoriesModel.updateOne(
            {
                'subCategories._id': req.params.idSubCategory
            },
            {
                $set: { 
                    'subCategories.$': 
                        { 
                            subCategories: subCategory,
                        } 
                }
            }
        );
        res.status(200).json({message: "Sub categoria agregada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.deleteSubClassification = async (req,res) => {
    try {
        /* const { subCategory } = req.body;
        await CategoriesModel.updateOne(
            {
                'subCategories._id': req.params.idSubCategory
            },
            {
                $set: { 
                    'subCategories.$': 
                        { 
                            subCategories: subCategory,
                        } 
                }
            }
        ); */
        res.status(200).json({message: "Sub categoria agregada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}


module.exports = classificationCtrl;