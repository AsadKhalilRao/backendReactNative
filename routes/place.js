const router = require('express').Router();
const placeController = require('../controllers/placeController');
const placesController = require('../controllers/placeController');
const { verifyToken } = require('../middleware/jwt_token');


// Route to add a new place
router.post('/', verifyToken, placesController.addPlaces);

// Route to get all places
router.get('/', placesController.getPlaces);

// Route to get a single place by ID
// When we need a single place we require the single id
router.get('/:id', verifyToken, placesController.getPlace);

router.get("/byCountry/:id",verifyToken,placeController.getPlacesByCountry);
router.get("/search/:key",placeController.search);

module.exports = router;
