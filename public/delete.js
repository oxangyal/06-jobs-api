import { enableInput, inputEnabled, message, token } from "./index.js";

import { showWorkouts } from "./workouts.js";

export const deleteWorkout = async (workoutId) => {
    enableInput(false);
    const url = `api/v1/workouts/${workoutId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                message.textContent =
                    "Workout deleted successfully: " + data.msg;
                console.log(data.msg);
            } else {
                message.textContent = "Workout deleted successfully.";
            }

            showWorkouts();
        } else {
            message.textContent = "Failed to delete the workout.";
        }
    } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
    } finally {
        enableInput(true);
    }
};