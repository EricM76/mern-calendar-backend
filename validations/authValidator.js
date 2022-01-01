const {check} = require('express-validator');
const validationsFields = require('../middlewares/validationsFields');

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),
    
    check('password')
        .notEmpty().withMessage('El password es obligatorio'),

    validationsFields

]