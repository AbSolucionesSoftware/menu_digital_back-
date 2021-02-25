const bannerCtrl = {};
const upliadImagen = require('../middleware/awsFile');
const modelBanner = require('../models/Banner');

bannerCtrl.uploadImagen = async (req, res, next) => {
    await upliadImagen.upload(req, res, function (err) {
      if (err) {
        res.json({ message: err });
      }
      return next();
    });
};

bannerCtrl.createBanner = async (req,res) => {
    try {
        const newBanner = new modelBanner(req.body);
        if(req.file){
          newBanner.imagenBannerKey = req.file.key;
          newBanner.imagenBannerUrl = req.file.location;
        }
        newBanner.save();
        res.status(200).json({message: "Banner agregado."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
        console.log(error);
    }
}

bannerCtrl.editBanner = async (req,res) => {
    try {
        const editBanner = await modelBanner.findById(req.params.idBanner);
        const newBanner = editBanner;
        if(req.file){
          newBanner.imagenBannerKey = req.file.key;
          newBanner.imagenBannerUrl = req.file.location;
          if(editBanner.imagenBannerKey){
            upliadImagen.eliminarImagen(editBanner.imagenBannerKey);
          }
          res.status(200).json({message: "Banner editado."});
        }else{
          res.status(404).json({message: "No existe imagen."});
        }
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}

bannerCtrl.deleteBaneer = async (req,res) => {
    try {
        const bannerDelete = await modelBanner.findById(req.params.idBanner);
        if(bannerDelete){
          if(bannerDelete.imagenProductKey){
            upliadImagen.eliminarImagen(bannerDelete.imagenProductKey);
          }
          await modelBanner.findByIdAndDelete(bannerDelete._id);
        }else{
          res.status(404).json({message: "Este banner no existe."});
        }
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}

bannerCtrl.getBanner = async (req,res) => {
    try {
        const bannersComapny = await modelBanner.find({company: req.params.idCompany});
        res.status(200).json(bannersComapny);
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}

module.exports = bannerCtrl;