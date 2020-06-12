var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResistenciaSchema =  Schema({
    tipo: String,
    valorNominal: String,
    tolerancia: String,
    potencia: String,
    colores: {
        color1: String,
        color2: String,
        color3: String,
        color4: String
    }
});

module.exports = mongoose.model('Resistencia', ResistenciaSchema)