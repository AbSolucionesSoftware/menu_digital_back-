const classificationCtrl = {};
const classificationModel = require("../models/Classification");
const producModel = require("../models/Product");

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
        await classificationModel.findByIdAndUpdate(req.params.idClassification,{type});
        res.status(200).json({message: "Editado correctamente."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.deleteClassification = async (req,res) => {
    try {
        const classification = await classificationModel.findById(req.params.idClassification);
        const productCompany = await producModel.find({company: classification.idCompany});
        let cont = 0;
        if(productCompany.length > 0){
            for(var i=0; i < productCompany.length; i++){
                if(productCompany[i].classifications.length > 0){
                    for(var z=0; z < productCompany[i].classifications.length; z++){
                        if(productCompany[i].classifications[z]._idClassification === classification._id){
                            cont++;
                        }
                    }
                }
            }
        }
        console.log(cont);
        if(cont > 0){
            res.status(500).json({message: "No se puede eliminar"});
        }else{
            if(classification.types.length > 0){
                res.status(500).json({message: "Esta classificacion aun tiene sub clasificaciones, no se puede eliminar."})
            }else{
                await classificationModel.findByIdAndDelete(req.params.idClassification);
                res.status(200).json({message: "Eliminado correctamente."});
            }
        }
        // res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

classificationCtrl.agregateSubClassification = async (req,res) => {
    try {
        const { name, price /* color = "" */ } = req.body;

        await classificationModel.updateOne(
            {
                _id: req.params.idClassification
            },
            {
                $addToSet: {
					types: {
						name: name,
                        price: price,
                        // color: color
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
        const { name, price } = req.body;
        await classificationModel.updateOne(
            {
                'types._id': req.params.idSubClassification
            },
            {
                $set: { 
                    'types.$': 
                        { 
                            name: name,
                            price: price
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
        
        await classificationModel.updateOne(
            {
				_id: req.params.idClassification
			},
			{
				$pull: {
					types: {
						_id: req.params.idSubClassification
					}
				}
			},
        );
        res.status(200).json({message: "Eliminada."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}


module.exports = classificationCtrl;