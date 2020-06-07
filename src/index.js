const express = require('express');
const  app = express();
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

app.get('/', (req, res) =>{
    res.send("<h1>Servidor funcionando.</h1>")
});

app.post('/resistencia', (req, res) =>{
    console.log(req.body);
    res.send();
});

app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
 });