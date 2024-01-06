import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";

import { showWorkouts } from "./workouts.js";

let addEditDiv = null;
let workoutType = null;
let duration = null;
let intensity = null;
let notes = null;
let addingWorkout = null;
// let completedInput = null;
let indoorInput = null;

export const handleAddEdit = () => {
    addEditDiv = document.getElementById("edit-workout");
    workoutType = document.getElementById("workout");
    duration = document.getElementById("duration");
    intensity = document.getElementById("intensity");
    notes = document.getElementById("notes");
    addingWorkout = document.getElementById("adding-workout");
    indoorInput = document.getElementById("indoor");
    // completedInput = document.getElementById("completed");
    const editCancel = document.getElementById("edit-cancel");

    addEditDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addingWorkout) {
                enableInput(false);

                let method = "POST";
                let url = "/api/v1/workouts";
                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            workoutType: workoutType.value,
                            duration: duration.value,
                            intensity: intensity.value,
                            notes: notes.value,
                            // completed: completedInput.checked,
                            indoor:
                                document.querySelector(
                                    'input[name="indoor"]:checked'
                                ).value === "true",
                        }),
                    });

                    const data = await response.json();
                    if (response.status === 201) {
                        message.textContent = "The workout was created.";

                        workoutType.value = "";
                        duration.value = "";
                        notes.value = "";
                        intensity.value = "low";
                        indoorInput.checked = true;
                        console.log(indoorInput.checked);

                        showWorkouts();
                    } else {
                        message.textContent = data.msg;
                    }
                } catch (err) {
                    console.log(err);
                    message.textContent = "A communication error occurred.";
                }

                enableInput(true);
            } else if (e.target === editCancel) {
                message.textContent = "";
                showWorkouts();
            }
        }
    });
};

export const showAddEdit = (workout) => {
    message.textContent = "";
    setDiv(addEditDiv);
};

