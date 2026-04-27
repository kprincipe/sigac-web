const express = require('express');

// abre conexao com o banco de dados SQLite3
const db = require('better-sqlite3')('database.sqlite3');

const app = express();
const PORT = 8080;

// prepara middlewares utilizados pela biblioteca ExpressJS
app.use(express.static('public'));
app.use(express.json());

// end-point que responde solicitacoes http GET com todos os usuarios cadastrados no sistema
app.get('/api/usuarios', (req, res) => {
    const usuarios = db.prepare('SELECT * FROM usuarios;');
    let rpt = [];

    for (const usuario of usuarios.iterate()) {
        rpt.push({nome:usuario.nome});
    }
    res.end(JSON.stringify(rpt));
});

// end-point que cadastra novos usuarios atraves de solicitacoes http POST
app.post('/api/cadastrar', (req, res) => {
    try {
        // verifica se o banco de dados existe para cadastro, se nao, criar
        db.exec('CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT) STRICT;');

        // insere na tabela `usuarios` dados vindos da solicitacao POST
        const stmt = db.prepare('INSERT INTO usuarios(nome) values(?);');
        stmt.run(req.body.nome);
    } catch(err) {
        console.log(err);

        // responde codigo e mensagem de erro em caso de excecao encontrada
        res.send({
            codigo: err.code,
            mensagem: err.message,
        })
    }
    res.end('sucesso!');
});

// abre servidor para escutar requisicoes dos clientes
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}...`);
});
