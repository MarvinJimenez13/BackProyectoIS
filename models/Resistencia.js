var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResistenciaSchema =  Schema({

    tipo: String,
    valorNominal: String,
    tolerancia: String,
    potencia: String
});

module.exports = mongoose.model('Resistencia', ResistenciaSchema)