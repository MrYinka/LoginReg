const router =  require('express').Router();
const { dashboard } = require('../controllers/dashboard');
const { authorize } = require('../middlewares/authorization');

router.get('/', authorize, dashboard);

module.exports = router;