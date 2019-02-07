/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:01:09 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:01:09 
*/
const SerieModel = require('./../models/serie')

class Serie {
    get(req, res){
        SerieModel.find({}, (error, serie) => {
            if(error)
                res.send(error)
            else
                res.json({data: serie})
        })
    }

    getByID(req, res) {
        SerieModel.findById(req.params.id, (error,serie) => {
            if(error)
                res.send(error)
            else
                res.json({data:serie})
        })
    }
    create(req, res) {
        //const CreateNewSerie = new SerieModel(req.body)
        SerieModel.create(req.body, (error, serie) => {
            if (error)
                res.send(error)
            else
                res.json({message: 'Série adicionada com sucesso!', data: serie})
        })
    }
    
    update(req, res){
        SerieModel.updateOne({_id: req.params.id}, {$set: req.body}, (error, serie) => {
            if(error)
                res.send(error)
            else 
                res.json({message: 'Série atualizada com sucesso!', data: serie})
        })
    }

    delete(req, res){
        SerieModel.findByIdAndRemove(req.params.id, (error, serie) => {
            if(error)
                res.send(error)
            else
                res.json({message: 'Série deletada com sucesso!', data: serie})
        })
    }
}

module.exports = new Serie()