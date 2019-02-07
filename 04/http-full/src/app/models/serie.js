/*
 * @Autor: Ian Rotondo Bagliotti 
 * @Data: 2019-02-07 12:01:15 
 * @Última modificação por: Ian Rotondo Bagliotti 
 * @Última hora modificada: 2019-02-07 12:01:15 
*/
const mongoose = require('mongoose')

const SerieSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },
        autor: {
            type: String,
            required: true,
            trim: true
        },
        genero: {
            type: String,
            required: true,
            trim: true
        },
        numeroTemporada: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('serie', SerieSchema)