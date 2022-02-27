const express = require('express');
const { loginInstruction, login } = require('../handlers/auth');
const catchAsync = require('../utilities/catchAsync')

const router = express.Router();

router.get('/', loginInstruction);
router.post('/', catchAsync(login));

module.exports = router;