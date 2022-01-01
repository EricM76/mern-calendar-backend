const {Router} = require('express');
const router = Router();

const { all, create, update, remove } = require('../controllers/eventsController');
const validationJWT = require('../middlewares/validationJWT');
const eventValidator = require('../validations/eventValidator');

/* host + /api/events */

router.use(validationJWT); //aplica el middleware de validación a todas las rutas

router
    .get('/', all)
    .post('/', eventValidator,create)
    .put('/:id', update)
    .delete('/:id',remove)
    
module.exports = router;