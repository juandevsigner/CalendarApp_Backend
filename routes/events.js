const { Router} = require('express');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router()
const { getEvents, createEvent, deleteEvent, updateEvent } = require('../controllers/event');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');
const { isDate } = require('../helpers/isDate');


router.use(validateJWT)

router.get('/', getEvents )

router.post('/',
[
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Date start is required').custom(isDate),
    check('end', 'Date end is required').custom(isDate),

],
validateField, createEvent )

router.put('/:id',[
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Date start is required').custom(isDate),
    check('end', 'Date end is required').custom(isDate),

],
validateField,
updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router


//event routes
//host + /api/events