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

                if (addingWorkout.textContent === "update") {
                    method = "PATCH";
                    url = `/api/v1/workouts/${addEditDiv.dataset.id}`;
                }
                console.log("Indoor: " + indoorInput.checked);
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
                            indoor: indoorInput.checked,
                            // completed: completedInput.checked,
                            // indoor:
                            //     document.querySelector(
                            //         'input[name="indoor"]:checked'
                            //     ).value === "true",
                        }),
                    });

                    console.log(indoorInput);

                    const data = await response.json();
                    if (response.status === 200 || response.status === 201) {
                        if (response.status === 200) {
                            message.textContent =
                                "The workout entry was updated.";
                        } else {
                            message.textContent =
                                "The workout entry was created.";
                        }

                        workoutType.value = "";
                        duration.value = "";
                        notes.value = "";
                        intensity.value = "low";
                        indoorInput.checked = true;

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

// export const showAddEdit = (workout) => {
//     message.textContent = "";
//     setDiv(addEditDiv);
// };

export const showAddEdit = async (workoutId) => {
    if (!workoutId) {
        workoutType.value = "";
        duration.value = "";
        intensity.value = "low";
        notes.value = "";
        indoorInput.checked = true;
        addingWorkout.textContent = "add";
        message.textContent = "";

        setDiv(addEditDiv);
    } else {
        enableInput(false);

        try {
            const response = await fetch(`/api/v1/workouts/${workoutId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.status === 200) {
                workoutType.value = data.workout.workoutType;
                duration.value = data.workout.duration;
                intensity.value = data.workout.intensity;
                notes.value = data.workout.notes;
                const indoorRadio = document.getElementById("indoor");
                const outdoorRadio = document.getElementById("outdoor");
                indoorRadio.checked = data.workout.indoor === true;
                outdoorRadio.checked = data.workout.indoor === false;
                addingWorkout.textContent = "update";
                message.textContent = "";
                addEditDiv.dataset.id = workoutId;

                setDiv(addEditDiv);
            } else {
                message.textContent = "The workout entry was not found";
                showWorkouts();
            }
        } catch (err) {
            console.log(err);
            message.textContent = "A communications error has occurred.";
            showWorkouts();
        }

        enableInput(true);
    }
};

