// API endpoints routing
const express = require('express');
const { analyzeAST } = require('../controllers/astParser');
const { fixWithAI } = require('../controllers/aiFixer');

const router = express.Router();

// Route to scan the C code
router.post('/scan', analyzeAST);

// Route to fix the specific vulnerability using AI
router.post('/fix', fixWithAI);

module.exports = router;