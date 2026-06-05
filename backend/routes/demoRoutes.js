const express = require('express');
const router = express.Router();
const { getDemoTeams, getDemoMatches } = require('../controllers/demoController');

router.get('/teams', getDemoTeams);
router.get('/matches', getDemoMatches);

module.exports = router;
