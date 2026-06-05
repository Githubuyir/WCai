const express = require('express');
const router = express.Router();
const { getMatches, getMatchById, createMatch, updateMatch } = require('../controllers/matchController');

router.get('/', getMatches);
router.get('/:id', getMatchById);
router.post('/', createMatch);
router.put('/:id', updateMatch);

module.exports = router;
