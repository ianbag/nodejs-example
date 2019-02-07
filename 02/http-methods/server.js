/**
 * File: server.js
 * Author: Hygor Podgornik
 * Description: Arquivo responsável por executar a aplicação
 * Date: 24/01/2019 
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var carro = require('./app/routes/carro');
var config = require('config');
var port = 3000;

//Opções da base de dados
var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

//Realizando conexão com a base de dados
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao estabelecer conexão com a base de dados'));

//Exibir logs dos testes
if (config.util.getEnv('NODE_ENV ') !== 'test') {

    //Utilização do Morgan para realizar requisições de logger no middleware
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.json({ message: "Base de dados de Automóveis" }));

//Definindo rotas GET e POST
app.route('/carro')
    .get(carro.selecionarTodosOsCarros)
    .post(carro.adicionarCarro);

//Definindo rotas GET, PUT, DELETE
app.route('/carro/:id')
    .get(carro.selecionarCarroPorId)
    .put(carro.editarCarro)
    .delete(carro.excluirCarro)

app.listen(port);
console.log(`Aplicação executando na porta ${port}`);

module.exports = app;