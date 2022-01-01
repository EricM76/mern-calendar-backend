const {Router} = require('express');
const router = Router();

const { userLogin, userCreate, revalidateToken } = require('../controllers/authController');

const registerValidator = require('../validations/registerValidator');
const authValidator = require('../validations/authValidator');

const validationJWT = require('../middlewares/validationJWT')

/* localhost + /api/auth */
router
    .post('/', authValidator, userLogin)
    .post('/new',registerValidator, userCreate)
    .get('/renew',validationJWT, revalidateToken)
    
module.exports = router;