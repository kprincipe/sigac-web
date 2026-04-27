const URL = 'http://127.0.0.1:8080/api/usuarios';

async function atualizarUsuarios(url) {
    try {
        console.log(url);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`status: ${res.status}`);
        }

        const usuarios = await res.json();

        const content = document.getElementById('content');
        for (const usuario of usuarios) {
            const entry = document.createElement('div');
            const nome = document.createElement('h1');

            nome.append(usuario.nome);
            entry.appendChild(nome);

            entry.setAttribute('class', 'entry');
            content.appendChild(entry);

            console.log(usuario.nome);
        }
    } catch (err) {
        console.log(err.message);
    }
}

atualizarUsuarios(URL);
