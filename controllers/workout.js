const Workout = require("../models/Workout");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllWorkouts = async (req, res) => {
    res.send("get all workouts");
};

const getWorkout = async (req, res) => {
    res.send("get single workout");
};

const createWorkout = async (req, res) => {
    //    console.log(req.user);
    req.body.createdBy = req.user.userId;

    const workout = await Workout.create(req.body);
    res.status(StatusCodes.CREATED).json({ workout });
};

const updateWorkout = async (req, res) => {
    res.send("update workout");
};

const deleteWorkout = async (req, res) => {
    res.send("delete workout");
};

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
