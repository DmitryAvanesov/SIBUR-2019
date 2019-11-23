"use strict";

window.NAVBAR_HEIGHT = 56;

document.addEventListener("DOMContentLoaded", function () {
    let anchorLinks = document.querySelectorAll("nav.navbar a.anchor-link");
    anchorLinks.forEach(function (item) {
        item.addEventListener("click", ScrollPageUp);
    });

    let signUpButton = document.querySelector("form button.sign-up-button");
    signUpButton.addEventListener("click", FillModalWindow);
});


let ScrollPageUp = function () {
    window.setTimeout(function () {
        window.scrollBy(0, -window.NAVBAR_HEIGHT);
    }, 0);
}

let FillModalWindow = function () {
    let modalTitle = document.querySelector("#accountModalLabel");
    let modalContent = document.querySelectorAll("div.modal-content > div.modal-body div.content-label");
    let formInput = document.querySelectorAll("form input.form-control");

    modalTitle.innerHTML = `New account for ${formInput[1].value}`;

    for (let i = 0; i < modalContent.length; i++) {
        modalContent[i].innerHTML = formInput[i].value;
    }
}