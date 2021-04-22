const categoriesCtrl = {};
const CategoriesModel = require("../models/Categories");
const productModel = require("../models/Product");


categoriesCtrl.createCategories = async (req,res) => {
    try {
        const { category } = req.body;
        const categories = new CategoriesModel({ idCompany: req.params.idCompany, category: category });
        categories.save(async (err, response) => {
            if(err){
                res.status(500).json({ message: 'Ups, algo paso al agregar.', err });
            } else {
                if(!response){
                    res.status(404).json({ message: 'Error al agregar.' });
                }else{
                    res.status(200).json(response);
                }
            }
        });
        // res.status(200).json({message: ""});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.getCategories = async (req,res) => {
    try {
        const categories = await CategoriesModel.find({idCompany: req.params.idCompany});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.updateCategorie = async (req,res) => {
    try {
        const { category } = req.body;
        // const categories = await CategoriesModel.find({idCompany: req.params.idCompany});
        await CategoriesModel.findByIdAndUpdate(req.params.idCategory,{category});
        res.status(200).json({message: "Categoria editada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

categoriesCtrl.deleteCategorie = async (req,res) => {
    try {
        const categories = await CategoriesModel.findById(req.params.idCategory);
        if(categories.subCategories.length > 0){

        }else{
            
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}



module.exports = categoriesCtrl;