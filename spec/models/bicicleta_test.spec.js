var Bicicleta = require('../../models/bicicleta');
var mongoose = require('mongoose');

describe('Testing Bicicletas', function () {
    beforeEach(function (done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.disconnect();
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database! BICICLETA');
            done();
        });
    });


    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('Crear instancia de Bicicleta', (done) => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);

            done();
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacía', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('Agrega una bici', (done) => {
            var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
            Bicicleta.add(aBici, function (err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Devolver bici con code 1', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });

                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);
                    var aBici2 = new Bicicleta({ code: 2, color: "roja", modelo: "urbana" });

                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);

                        Bicicleta.findByCode(1, function (error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });
});

/*
beforeEach( () => { Bicicletas.allBicis = []; });

describe('Bicicleta.allBicics', () => {
    it('comienza vacio', () => {
        expect(Bicicletas.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.60, -58.38]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bicic con id 1', () => {
        expect(Bicicletas.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "verde", "urbana");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    })
})

describe('Bicicleta.removeById', () => {
    it('Eliminar por Id', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
        var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
        var c = new Bicicleta(3, 'verde', 'montaña', [-34.591212, -58.3801212]);

        Bicicleta.add(a);
        Bicicleta.add(b);
        Bicicleta.add(c);

        Bicicleta.removeById(2);

        expect(Bicicleta.allBicis.length).toBe(2);
    });
});
*/