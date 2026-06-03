const router = require('express').Router();

router.use('/', require('./swagger'));


router.get('/', (req, res) => {
    //#swagger.tags=['Final Project']
    res.send('Final Project');
});

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));


module.exports = router;