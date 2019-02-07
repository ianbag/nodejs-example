/**
 * File: app/models/carro.js
 * Author: Hygor Podgornik
 * Description: Arquivo responsável pelo modelo de dados do carro
 * Date: 24/01/2019
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Definindo o Schema do carro
var CarroSchema = new Schema(
    {
        marca: { type: String, required: true },
        modelo: { type: String, required: true },
        ano: { type: Number, required: true },
        motor: { type: String, required: true },
        adicionadoEm: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

//Setando o parâmetro "adicionadoEm"
CarroSchema.pre('save', next => {
    var dataAtual = new Date();
    if (!this.adicionadoEm) {
        this.adicionadoEm = dataAtual;
    }
    next();;
});

module.exports = mongoose.model('carro', CarroSchema);