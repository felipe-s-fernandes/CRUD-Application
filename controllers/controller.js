import fs from "fs";
import { v4 as uuidv4 } from "uuid";

function readDatabase() {
    return JSON.parse(fs.readFileSync("database/users.json", "utf8"));
}

export const getUsers = (req, res) => {
    console.log("GET request!");
    const users = readDatabase();
    res.status(200).send(users);
};

export const postUser = (req, res) => {
    let users = readDatabase();

    console.log("POST request!", req.body);
    const user = { ...req.body, id: uuidv4() };
    users.push(user);

    fs.writeFile("database/users.json", JSON.stringify(users), (err) => {
        if (err) throw err;
        res.status(200).send(`Usuário "${user.name}" cadastrado com sucesso!`);
    });
};

export const patchUser = (req, res) => {
    console.log("PATCH request!");

    let users = readDatabase();

    const id = req.params.id;
    const { name, email } = req.body;

    const user = users.find((user) => user.id === id);

    if (name) user.name = name;
    if (email) user.email = email;

    fs.writeFile("database/users.json", JSON.stringify(users), (err) => {
        if (err) throw err;
        res.status(200).send(`Usuário com id ${id} atualizado com sucesso!`);
    });
};

export const deleteUser = (req, res) => {
    console.log("DELETE request!");
    let users = readDatabase();
    const id = req.params.id;

    const newUsers = users.filter((user) => user.id !== id);

    fs.writeFile("database/users.json", JSON.stringify(newUsers), (err) => {
        if (err) throw err;
        res.status(200).send(`Usuário com id ${id} removido com sucesso!`);
    });
};
