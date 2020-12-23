var mongoose = require('mongoose');
var Usuario = require('../../models/usuario');
var Bicicleta = require('../../models/bicicleta');
var Reserva = require('../../models/reserva');

describe('Testing Usarios ', function() {
    beforeEach(function(done) {
        var mongoDB = "mongodb://localhost/testdb";
        mongoose.disconnect();
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database! USUARIO');
            done();
        });
    });

    afterEach(function(done) {
        Reserva.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            
            Usuario.deleteMany({}, function(err, success) {
                if (err) console.log(err);
                
                Bicicleta.deleteMany({}, function(err, success) {
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('cuando un Usuario reserva una Bici', () => {
        it('Debe existir la reserva', (done) => {      
            const usuario = new Usuario({ nombre: 'julian' });
            usuario.save();
            
            const bicicleta = new Bicicleta({ code: 1, color: "rojo", modelo: "urbana" });
            bicicleta.save();
            
            var hoy = new Date();
            var manana = new Date();

            manana.setDate(hoy.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, manana, (err, reserva) => {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });
});