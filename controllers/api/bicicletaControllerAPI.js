var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
}
exports.bicicleta_update = function (req, res) {
    Bicicleta.findByCode(req.body.code, (err, targetBici) => {
        if (err) console.log(err);

        targetBici.code = req.body.code
        targetBici.color = req.body.color;
        targetBici.modelo = req.body.modelo;
        targetBici.ubicacion = [req.body.lat, req.body.lng];
        targetBici.save();

        res.status(203).json({
            targetBici: targetBici
        });
    });
};
exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}