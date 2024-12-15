const express = require('express');
const router = express.Router();
const {
    getGoals,
    createGoals,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController');
const {protect} = require("../middlewares/auth.js");

router.get('/', protect, getGoals);

router.post('/', protect, createGoals);

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

module.exports = router;