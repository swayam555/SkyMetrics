const express = require('express');
const { getAlerts } = require('../controllers/alertController');

const router = express.Router();

// Endpoint to get alerts
router.get('/', getAlerts);

module.exports = router;
