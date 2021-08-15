const bannerCtrlAdmin = {};
const upliadImagen = require('../middleware/awsFile');
const modelBannerAdmin = require('../models/AdminBanner');

bannerCtrlAdmin.uploadImagen = (req, res, next) => {
    upliadImagen.upload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err });
      }
      return next();
    });
};

bannerCtrlAdmin.createBanner = async (req, res) => {
    try {
        const newBanner = new modelBannerAdmin(req.body);
        if(req.file){
          console.log(req.body);
          newBanner.imgBannerAdminKey = req.file.key;
          newBanner.imgBannerAdminUrl = req.file.location;
          newBanner.frente = true;
          await newBanner.save();
          res.status(200).json({message: "Banner agregado."});
          console.log('Si entra');
        }else{
          res.status(404).json({message: "Imagen necesaria."});
        }
    } catch (error) {
        res.status(500).json({message: "Error del servidor"}, error);
    }
}

bannerCtrlAdmin.editBanner = async (req,res) => {
    try {
        const editBanner = await modelBannerAdmin.findById(req.params.idBanner);
        const file = {imgBannerAdminKey: "", imgBannerAdminUrl: ""};
        if(req.file){
          if(editBanner.imgBannerAdminKey){
            file.imgBannerAdminKey = req.file.key;
            file.imgBannerAdminUrl = req.file.location;
            upliadImagen.eliminarImagen(editBanner.imgBannerAdminKey);
          }
          await modelBannerAdmin.findByIdAndUpdate(req.params.idBanner,file);
          res.status(200).json({message: "Banner editado."});
        }else{
          res.status(404).json({message: "No existe imagen."});
        }
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}

bannerCtrlAdmin.deleteBaneer = async (req,res) => {
    try {
        const bannerDelete = await modelBannerAdmin.findById(req.params.idBanner);
        if(bannerDelete){
          if(bannerDelete.imgBannerAdminKey){
            upliadImagen.eliminarImagen(bannerDelete.imgBannerAdminKey);
          }
          await modelBannerAdmin.findByIdAndDelete(bannerDelete._id);
          res.status(200).json({message: "Banner eliminado."});
        }else{
          res.status(404).json({message: "Este banner no existe."});
        }
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}

bannerCtrlAdmin.getBanner = async (req,res) => {
    try {
      const bannersComapny = await modelBannerAdmin.find({frente: true});
      res.status(200).json(bannersComapny);
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}

module.exports = bannerCtrlAdmin;
