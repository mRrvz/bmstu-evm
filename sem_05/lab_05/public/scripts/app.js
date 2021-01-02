"use strict";

const post = async (url, body) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body
    })
        .then(response => response.json())
}

const get_content = (res) => {
    return JSON.stringify(res.result);
}

const send = () => {
    let surname = document.querySelector("#surname-input");
    let email = document.querySelector("#email-input");
    let phone = document.querySelector("#phone-input");
    let res = document.querySelector("#result");

    if (email && surname && phone && result) {
        email = email.value;
        surname = surname.value;
        phone = phone.value;

        const str_body = JSON.stringify({ email, surname, phone });
        post("/user", str_body)
            .then(result => {
                res.textContent = get_content(result);
        });
    }
}

const btn = document.querySelector("button");
btn.addEventListener("click", send);
