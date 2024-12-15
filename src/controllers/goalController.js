const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel.js");
const User = require("../models/userModel.js");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id});
    res.status(200).json(goals);
})

// @desc Create goal
// @route POST /api/goals
// @access Private
const createGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        // res.status(400).json({message:"Please enter a text for goal"})
        res.status(400)
        throw new Error("Please enter a text for goal")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(201).json(goal)
})

// @desc Update goal
// @route PUT /api/goal/id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(404)
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the login user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updateGoal)
})

// @desc Delete goal
// @route DELETE /api/goal/id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(404)
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the login user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    createGoals,
    updateGoal,
    deleteGoal
}