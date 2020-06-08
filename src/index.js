const express = require('express');
const app = express();
const moongose = require('mongoose');
var Resistencia = require('./../models/Resistencia.js');
var path = require("path");
var publicPath=path.resolve(__dirname,"public");

app.use(express.static(publicPath));
app.set('port', 3000);
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://pruebaapipro.000webhostapp.com');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('https://pruebaapipro.000webhostapp.com', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

moongose.connect('mongodb+srv://Marvin:is@cluster0-6ms30.mongodb.net/ProyectoIS?retryWrites=true&w=majority',
        { useNewUrlParser: true })
        .then(() => {
            console.log('Conectado a Mongo DB Atlas');
        })
        .catch(err => console.log(err));

app.get('/', (req, res) =>{
    res.sendFile(path.join( __dirname + '/public/index.html'));
});

app.get('/resistencia/:id', (req, res) =>{
    Resistencia.find({_id:req.params.id},function(err,documentos){
        res.send("<h1>"+documentos+"</h1>");
        console.log(documentos);
      });
});

app.post('/resistencia', (req, res) =>{
    console.log(req.body);
    var resistencia = Resistencia({
        tipo: req.body.tipo,
        valorNominal: req.body.nominal,
        tolerancia: req.body.tolerancia,
        potencia: req.body.potencia
    });

    resistencia.save(function(err, data) {
        if (err)
            res.send('Error al registrar resistencia.');
        else
            res.send('Resistencia registrada, revisa en Gestión.');
    });
});

app.listen(process.env.PORT || app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
 });