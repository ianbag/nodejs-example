/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:01:21 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:01:21 
*/
const express = require('express')
const router = express.Router()
const SerieController = require('./../controllers/serie')

router.get('/serie', SerieController.get)
router.get('/serie/:id', SerieController.getByID)
router.post('/serie', SerieController.create)
router.put('/serie/:id', SerieController.update)
router.delete('/serie/:id', SerieController.delete)

module.exports = router