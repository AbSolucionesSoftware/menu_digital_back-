const { Router } = require("express");
const router = Router();
const {
    getPedidos,
    createPedido,
    updateEstado
} = require("../controllers/Pedido.controller");
const auth = require("../middleware/auth");

router.route("/newPedido/:idCompany").post(createPedido);

router.route("/:idCompany").get(getPedidos);

router.route("/action/estadoPedido/:idPedido").put(updateEstado);

module.exports = router;