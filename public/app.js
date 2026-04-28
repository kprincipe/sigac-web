// endpoint da api que devolve todos os usuarios registrados no banco de dados
const URL = 'http://127.0.0.1:8080/api/usuarios';

// cria um elemento entry e insere no conteudo da pagina
const criarEntry = (str_titulo, str_corpo, div) => {
    const node_entry = document.createElement('div');
    const node_titulo = document.createElement('h1');
    const node_corpo = document.createElement('p');

    node_titulo.append(str_titulo);
    node_corpo.append(str_corpo);

    node_entry.appendChild(node_titulo);
    node_entry.appendChild(node_corpo);

    node_entry.setAttribute('class', 'entry');
    div.appendChild(node_entry);
};

// solicita lista de usuarios do endpoint USUARIOS
async function atualizarUsuarios(url) {
    try {
        const res = await fetch(url);

        const content = document.getElementById('content');
        
        // lida com erros vindos do servidor e apresenta mensagem para o usuario
        if (!res.ok) {
            criarEntry('Erro interno!', `Ocorreu alguma exceção interna, contate o seu administrador. Código de erro: ${res.status}`, content);
            throw new Error(`status: ${res.status}`);
        }
        
        // resposta em json vinda como resposta servidor
        const usuarios = await res.json();

        // exibe mensagem em caso de banco de dados sem cadastros
        if (usuarios == null) {
            criarEntry('Nenhum discente cadastrado!', '', content);
            throw new Error(`status: ${res.status}`);
        }

        // itera todos os usuarios vindo do banco de dados e criar entries para cada um no conteudo da pagina
        for (const usuario of usuarios) {
            criarEntry(usuario.nome, 'ipsem lorem', content);
        }
    } catch (err) {
        console.log(err.message);
    }
}

// atualiza imediatamente ao carregar a pagina
atualizarUsuarios(URL);
