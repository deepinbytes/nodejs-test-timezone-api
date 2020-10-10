const userModel = require('../models/userModel');

const router = require('express').Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const countryController = require('../controllers/countryController');

router.post('/register', userController.register);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);

const {authenticate} = require('./../services/authenticate');

router.get('/country', authenticate, countryController.list);
router.get('/country/:name', authenticate, countryController.byName);

router.get('/addDummyaccounts', (req, res) => {
    const timestp = new Date();
    userModel.seedDummyAccounts();
    res.status(200).send({
     message: 'Added Dummy Accounts',
     tempo: timestp.toJSON()
    })
  });


module.exports = router;