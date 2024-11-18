const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o pacote CORS

const app = express();

// Habilita CORS para todas as origens
app.use(cors());  // Ou você pode usar app.use(cors({ origin: 'http://localhost:5173' })) para limitar a origem

// Usando body-parser para entender o corpo das requisições em JSON
app.use(bodyParser.json());

const usuarios = [];

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Rota para obter um usuário específico por email
app.get('/usuarios/:email', (req, res) => {
    const { email } = req.params;
    const usuario = usuarios.find(v => v.email === email);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'usuário não encontrado.' });
    }
});

// Rota para cadastrar um novo usuário
app.post('/usuarios', (req, res) => {
    const { email, nome, senha  } = req.body;
    const usuario = { email, nome, senha };
    usuarios.push(usuario);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
});

// Rota para atualizar as informações de um usuário
app.put('/usuarios/:email', (req, res) => {
    const { email } = req.params;
    const { nome, senha } = req.body;
    const usuario = usuarios.find(v => v.email === email);
    if (usuario) {
        usuario.nome = nome || usuario.nome;
        usuario.senha = senha || usuario.senha;
        res.json({ message: 'Informações do usuário atualizadas com sucesso.' });
    } else {
        res.status(404).json({ message: 'usuário não encontrado.' });
    }
});

// Rota para excluir um usuário
app.delete('/usuarios/:email', (req, res) => {
    const { email } = req.params;
    const veiculoIndex = usuarios.findIndex(v => v.email === email);
    if (veiculoIndex !== -1) {
        usuarios.splice(veiculoIndex, 1);
        res.json({ message: 'usuário excluído com sucesso.' });
    } else {
        res.status(404).json({ message: 'usuário não encontrado.' });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});