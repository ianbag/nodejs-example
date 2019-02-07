/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:03:46 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:03:46 
*/

var mongoose = require('mongoose');
var Carro = require('../models/carro');

function selecionarTodosOsCarros(req, res) {
    Carro.find({}, (error, carro) => {
        if(error)
            res.send(error)
        else
            res.json(carro)
    })
}

function adicionarCarro(req, res) {
    const CarroCadastrar = req.body
    Carro.create(CarroCadastrar, (error, carro) => {
        if(error)
            res.send(error)
        else
            res.json({message: 'Carro adicionado com sucesso', carro})
    })
}

function selecionarCarroPorId(req, res) {
    Carro.findById(req.params.id, (error, carro) => {
        if(error)
            res.send(error)
        else
            res.json(carro)
    })
}

function editarCarro(req, res) {
    Carro.findByIdAndUpdate(req.params.id, req.body, (error, carro) => {
        if(error)
            res.send(error)
        else
            res.json({message: 'Carro atualizado com sucesso', carro})
    })
}

function excluirCarro(req, res) {
    Carro.findByIdAndRemove(req.params.id, (error, carro) => {
        if(error)
            res.send(error)
        else
            res.json({message: 'Carro excluido com sucesso', carro})
    })
}

module.exports = { selecionarTodosOsCarros, adicionarCarro, selecionarCarroPorId, editarCarro, excluirCarro };