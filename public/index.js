import { createUserRow, tableHeading } from "./modules/rendering.js";

const usersTable = document.querySelector("table");
const nameInput = document.querySelector("#nome-input");
const emailInput = document.querySelector("#e-mail-input");
const button = document.querySelector("#cadastrar");

renderTable();

let selectedId;

button.addEventListener("click", () => {
    if (button.value === "Cadastrar") {
        addUser();
    }
    if (button.value === "Atualizar") {
        patchUser();
        button.value = "Cadastrar";
    }
    nameInput.value = "";
    emailInput.value = "";
});

usersTable.addEventListener("click", (event) => {
    const action = event.target.parentElement.classList[0];
    const userHTML = event.target.parentElement.parentElement.children;
    const userId = userHTML[0].innerText;
    const userName = userHTML[1].innerText;
    const userEmail = userHTML[2].innerText;

    if (action === "excluir") {
        console.log("excluindo:", userId);
        deleteUser(userId);
    }
    if (action === "editar") {
        console.log("editando:", userId);
        selectedId = userId;
        nameInput.value = userName;
        emailInput.value = userEmail;
        button.value = "Atualizar";
    }
});

async function addUser() {
    button.disabled = true;
    const user = {
        name: nameInput.value,
        email: emailInput.value,
    };

    try {
        await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        await renderTable();
        button.disabled = false;
    } catch (err) {
        button.disabled = false;
        throw err;
    }
}

async function deleteUser(userId) {
    try {
        await fetch(`http://localhost:8080/users/${userId}`, {
            method: "DELETE",
        });
    } catch (err) {
        throw err;
    }
    await renderTable();
}

async function patchUser() {
    button.disabled = true;
    const patch = {
        name: nameInput.value,
        email: emailInput.value,
    };
    try {
        await fetch(`http://localhost:8080/users/${selectedId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patch),
        });
        await renderTable();
        button.disabled = false;
    } catch (err) {
        button.disabled = false;
        throw err;
    }
}

async function getUsers() {
    try {
        const usersResponse = await fetch("http://localhost:8080/users", {
            method: "GET",
        });
        const users = await usersResponse.json();
        return users;
    } catch (err) {
        throw err;
    }
}

async function renderTable() {
    usersTable.innerHTML = "";
    const users = await getUsers();

    usersTable.appendChild(tableHeading());

    users.forEach((user) => {
        const userRow = createUserRow(user);
        usersTable.appendChild(userRow);
    });
}
