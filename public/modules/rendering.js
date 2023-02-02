export function createUserRow(user) {
    const tr = document.createElement("tr");

    const idNumber = createTd("id-number", user.id);
    idNumber.innerText = user.id;

    const nome = createTd("nome", user.name);
    nome.innerText = user.name;

    const email = createTd("e-mail", user.email);
    email.innerText = user.email;

    const editar = createTd(
        "editar",
        '<img src="./src/lapis.png" alt="Ícone de editar">'
    );

    const excluir = createTd(
        "excluir",
        '<img src="./src/excluir.png" alt="Ícone de excluir">'
    );

    tr.appendChild(idNumber);
    tr.appendChild(nome);
    tr.appendChild(email);
    tr.appendChild(editar);
    tr.appendChild(excluir);

    return tr;
}
export function tableHeading() {
    const th = document.createElement("tr");
    th.id = "table-heading";

    const idNumber = createTd("id-number", "#ID");
    const nome = createTd("nome", "NOME");
    const email = createTd("e-mail", "E-MAIL");
    const editar = createTd("editar", "EDITAR");
    const excluir = createTd("excluir", "EXCLUIR");

    th.appendChild(idNumber);
    th.appendChild(nome);
    th.appendChild(email);
    th.appendChild(editar);
    th.appendChild(excluir);

    return th;
}

function createTd(className, HTML) {
    const td = document.createElement("td");
    td.classList.add(className);
    td.innerHTML = HTML;
    return td;
}
