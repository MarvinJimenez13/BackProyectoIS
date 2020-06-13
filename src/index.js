const express = require('express');
const app = express();
const mongoose = require('mongoose');
var Resistencia = require('./../models/Resistencia.js');
var path = require("path");
var publicPath=path.resolve(__dirname,"public");

mongoose.set('useFindAndModify', false);
app.use(express.static(publicPath));
app.set('port', 3000);
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

mongoose.connect('mongodb+srv://Marvin:is@cluster0-6ms30.mongodb.net/ProyectoIS?retryWrites=true&w=majority',
        { useNewUrlParser: true })
        .then(() => {
            console.log('Conectado a Mongo DB Atlas');
        })
        .catch(err => console.log(err));

/*Ruta de presentación*/        
app.get('/', (req, res) =>{
    res.sendFile(path.join( __dirname + '/public/index.html'));
});

/*Obtener detalles de una resistencia*/
app.get('/resistencia/:id', (req, res) =>{
    Resistencia.find({_id:req.params.id},function(err, documentos){
        res.send(documentos);
      });
});

/*Obtener resistencias registradas*/
app.get('/resistencias', (req, res) =>{
    Resistencia.find({}, function(err, documentos){
        console.log(documentos);
        res.status(200).send(documentos);
    });
});

/*Agregar una resistencia*/
app.post('/resistencia', (req, res) =>{
    console.log(req.body);
    var resistencia = Resistencia({
        tipo: req.body.tipo,
        valorNominal: req.body.nominal,
        tolerancia: req.body.tolerancia,
        potencia: req.body.potencia,
        colores: {
            color1: req.body.colores.color1,
            color2: req.body.colores.color2,
            color3: req.body.colores.color3,
            color4: req.body.colores.color4
        }
    });
    resistencia.save(function(err, data) {
        if (err)
            res.send('Error al registrar resistencia.');
        else
            res.send('Resistencia registrada, revisa en Gestión.');
    });
});

/*Eliminar una resistencia*/
app.post('/eliminarResistencia', (req, res)=>{
  Resistencia.findOneAndDelete({_id:req.body.id}, function(err, data){
    if(err)
        res.status(404).send('No se pudo eliminar la resistencia.')
      else
        res.status(200).send('Resistencia eliminada correctamente.');
  });
});

/*Actualizar una resistencia*/
app.put('/resistencia',(req, res)=>{
    Resistencia.findOneAndUpdate({_id:req.body.id}, {'tipo':req.body.tipo, 'valorNominal':req.body.nominal, 'tolerancia':req.body.tolerancia, 'potencia':req.body.potencia, 'colores':req.body.colores}, function(err, data){
        if(err)  
            res.send("Error al actualizar la resistencia.");
        else    
            res.send("Resistencia actualizada correctamente.");
    });
});

app.listen(process.env.PORT || app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
 });
