import {
    enableInput,
    inputEnabled,
    message,
    setDiv,
    setToken,
    token,
} from "./index.js";

import { deleteWorkout } from "./delete.js";
import { showAddEdit } from "./addEdit.js";
import { showLoginRegister } from "./loginRegister.js";

let workoutsDiv = null;
let workoutsTable = null;
let workoutsTableHeader = null;

export const handleWorkouts = () => {
    workoutsDiv = document.getElementById("workouts");
    const logoff = document.getElementById("logoff");
    const addWorkout = document.getElementById("add-workout");
    workoutsTable = document.getElementById("workouts-table");
    workoutsTableHeader = document.getElementById("workouts-table-header");

    workoutsDiv.addEventListener("click", (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if (e.target === addWorkout) {
                showAddEdit(null);
            } else if (e.target === logoff) {
                setToken(null);
                message.textContent = "You have been logged off.";
                workoutsTable.replaceChildren([workoutsTableHeader]);
                showLoginRegister();
                } else if (e.target.classList.contains("editButton")) {
                message.textContent = "";
                showAddEdit(e.target.dataset.id);
                } else if (e.target.classList.contains("deleteButton")) {
                const workoutIdToDelete = e.target.dataset.id;
                deleteWorkoutHandler(workoutIdToDelete);
            }
        }
    });
};

const deleteWorkoutHandler = async (workoutId) => {
    enableInput(false);

    try {
        await deleteWorkout(workoutId);
        showWorkouts();
    } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
    }

    enableInput(true);
};

export const showWorkouts = async () => {
    try {
        enableInput(false);

        const response = await fetch("/api/v1/workouts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data);
        let children = [workoutsTableHeader];
        console.log(children);

        if (response.status === 200) {
            if (data.count === 0) {
                workoutsTable.replaceChildren(...children); // clear this for safety
            } else {
                for (let i = 0; i < data.workouts.length; i++) {
                    let rowEntry = document.createElement("tr");

                    let editButton = `<td><button type="button" class="editButton" data-id=${data.workouts[i]._id}>edit</button></td>`;
                    let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.workouts[i]._id}>delete</button></td>`;
                    // let completedCheckbox = `<td><input type="checkbox" ${
                    //     data.workouts[i].completed ? "checked" : ""
                    // } disabled></td>`;
                    let indoorRadio = `<td><input type="radio" name="indoor_${i}" value="true" ${
                        data.workouts[i].indoor === true ? "checked" : ""
                    } readonly> Indoor</td>`;
                    let outdoorRadio = `<td><input type="radio" name="indoor_${i}" value="false" ${
                        data.workouts[i].indoor === false ? "checked" : ""
                        } readonly> Outdoor</td>`;
                    console.log(data.workouts)
                    let rowHTML = `
            <td>${data.workouts[i].workoutType}</td>
            <td>${data.workouts[i].duration}</td>
            <td>${data.workouts[i].intensity}</td>
            <td>${data.workouts[i].notes}</td>
            <td>${data.workouts[i].indoor ? "Indoor" : "Outdoor"}</td>
            <div>${editButton}${deleteButton}</div>`;

                    rowEntry.innerHTML = rowHTML;
                    children.push(rowEntry);
                }
                workoutsTable.replaceChildren(...children);
            }
        } else {
            message.textContent = data.msg;
        }
    } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
    }

    enableInput(true);
    setDiv(workoutsDiv);
};


