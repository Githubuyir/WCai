const express = require('express');
const router = express.Router();
const { getTeams, getTeamByCode } = require('../controllers/teamController');

router.get('/', getTeams);
router.get('/:code', getTeamByCode);

module.exports = router;
