const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Marvin:is@cluster0-6ms30.mongodb.net/ProyectoIS?retryWrites=true&w=majority',
{ useNewUrlParser: true })
.then(() => {
    console.log('Conectado a Mongo DB Atlas');
})
.catch(err => console.log(err));

module.exports = mongoose;