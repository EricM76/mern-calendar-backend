const {check} = require('express-validator');
const validationsFields = require('../middlewares/validationsFields');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio'),

    check('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),
    
    check('password')
        .notEmpty().withMessage('El password es obligatorio')
        .isLength({min: 6}).withMessage('Se requiere un mínimo de 6 caracteres'),
    
    validationsFields

]