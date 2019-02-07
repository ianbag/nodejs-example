/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:01:28 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:01:28 
*/
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const database = require('./src/config/database')
const SerieRoute = require('./src/app/routes/serie')

/*
* Configurar porta para rodar a aplicação
*/
const PORT = 3000;

/*
* CONFIG bodyParser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


app.get('/', (req, res) => {
    res.send({message: 'CRUD de Séries'})
})

app.use('/', SerieRoute)

app.listen(PORT, () => {
    console.log(`Serviço rodando na porta ${PORT}`)
})

module.exports = app