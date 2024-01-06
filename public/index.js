let activeDiv = null;
export const setDiv = (newDiv) => {
    if (newDiv != activeDiv) {
        if (activeDiv) {
            activeDiv.style.display = "none";
        }
        newDiv.style.display = "block";
        activeDiv = newDiv;
    }
};

export let inputEnabled = true;
export const enableInput = (state) => {
    inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
    token = value;
    if (value) {
        localStorage.setItem("token", value);
    } else {
        localStorage.removeItem("token");
    }
};

export let message = null;

import { handleLoginRegister, showLoginRegister } from "./loginRegister.js";
import { handleWorkouts, showWorkouts } from "./workouts.js";

import { handleAddEdit } from "./addEdit.js";
import { handleLogin } from "./login.js";
import { handleRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
    token = localStorage.getItem("token");
    message = document.getElementById("message");
    handleLoginRegister();
    handleLogin();
    handleWorkouts();
    handleRegister();
    handleAddEdit();
    if (token) {
        showWorkouts();
    } else {
        showLoginRegister();
    }
});
