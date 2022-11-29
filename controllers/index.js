const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const itemRoutes = require('./itemRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/', homeRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/api', apiRoutes);

module.exports = router;
