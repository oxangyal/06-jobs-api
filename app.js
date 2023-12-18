require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");
//router
const authRouter = require("./routes/auth");
const workoutsRouter = require("./routes/workouts");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

//routes

app.use("/api/v1/auth", authRouter);
const authenticateUser = require("./middleware/authentication");
app.use("/api/v1/workouts", authenticateUser, workoutsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
