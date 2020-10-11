"use strict";

const get = async (url, body) => {
    url = Object.keys(body).reduce((acc, p) => acc + `${p}=${encodeURIComponent(body[p])}&`, url + `?`);

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8"

        },
    })  
        .then(response => response.json())
}

const get_content = (res) => {
    if (res.result === "FAIL") {
        return res.message;
    }

    return res.message + Object.keys(res.user).reduce((acc, field) => acc + `${field}: ${res.user[field]}\n`, "\n");
}

const get_info = () => {
    let email = document.querySelector("#email-input");
    const label = document.querySelector("#result");

    if (email && label) {
        email = email.value;

        get("/search", { email })
            .then(result => {
                label.textContent = get_content(result);
        });
    }
}

const btn = document.querySelector("button");
btn.addEventListener("click", get_info);
