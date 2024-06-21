const router = require('express').Router();
const countryController = require('../controllers/countryControllers');
const { verifyToken } = require('../middleware/jwt_token');

// Route to add a new country
router.post('/', countryController.addCountry);

// Route to get all countries
router.get('/', countryController.getCountries);
router.get('/:id', countryController.getCountry);
router.post('/places', countryController.addPlacesToCountry);

module.exports = router;
