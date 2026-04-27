const express = require('express');

const db = require('better-sqlite3')('database.sqlite3');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/usuarios', (req, res) => {
    const usuarios = db.prepare('SELECT * FROM usuarios;');
    let rpt = [];

    for (const usuario of usuarios.iterate()) {
        rpt.push({nome:usuario.nome});
    }
    res.end(JSON.stringify(rpt));
});

app.post('/api/cadastrar', (req, res) => {
    try {
        db.exec('CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT) STRICT;');

        const stmt = db.prepare('INSERT INTO usuarios(nome) values(?);');
        stmt.run(req.body.nome);
    } catch(err) {
        console.log(err);

        res.send({
            codigo: err.code,
            mensagem: err.message,
        })
    }
    res.end('sucesso!');
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}...`);
});
