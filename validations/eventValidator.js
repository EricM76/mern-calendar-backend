const {check} = require('express-validator');
const validationsFields = require('../middlewares/validationsFields');
const moment = require('moment');
moment.locale('es')


module.exports = [
    check('title')
        .notEmpty().withMessage('El título es obligatorio'),

    check('start')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .custom((value) => {
            if(!value){
                return false
            }
            const date = moment(value);
            if(date.isValid()){
                return true
            }else{
                return false
            }
        }).withMessage('La fecha de inicio es incorrecta')
        .custom((value, {req}) => {
            if(moment(value).diff(moment(),'days') < 0){
                return false
            }else {
                return true
            }
        }).withMessage('Tiene que ser una fecha igual o posterior a la fecha actual'),
    
    check('end')
        .notEmpty().withMessage('La fecha de finalización es obligatoria')
        .custom((value) => {
            if(!value){
                return false
            }
            const date = moment(value);
            if(date.isValid()){
                return true
            }else{
                return false
            }
        }).withMessage('La fecha de finalización es incorrecta')
        .custom((value, {req}) => {
            console.log(value, req.body.start)
            if(moment(value) < moment(req.body.start)) {
                return false
            }else{
                return true
            }
        }).withMessage('La fecha de finalización tiene que ser posterior a la de inicio'),
    
    validationsFields

]

