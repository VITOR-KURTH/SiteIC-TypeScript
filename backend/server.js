import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { UsuariosAll } from './database-postgres.js';

const server = fastify();
const databasePostgres = new UsuariosAll();

// Configuração do CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Rota para criar um novo usuário
server.post('/usuarios', async (request, reply) => {
    const body = request.body;

    // Validação de campos obrigatórios
    if (!body.nome || !body.email || !body.senha) {
        const errors = {};
        if (!body.nome) errors.nome = 'Faltou o nome.';
        if (!body.email) errors.email = 'Faltou o e-mail.';
        if (!body.senha) errors.senha = 'Faltou a senha.';
        return reply.status(400).send({ error: 'Campos obrigatórios faltando.', detalhes: errors });
    }

    try {
        await databasePostgres.createUsuario(body);
        return reply.status(201).send({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        if (error.message.includes('E-mail já está em uso')) {
            return reply.status(400).send({ error: 'O e-mail já está cadastrado. Por favor, use outro.' });
        }

        return reply.status(500).send({ error: 'Erro interno ao criar usuário.' });
    }
});

// Rota para listar todos os usuários
server.get('/usuarios', async (request, reply) => {
    try {
        const usuarios = await databasePostgres.listUsuarios();
        return reply.status(200).send(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return reply.status(500).send({ error: 'Erro interno ao listar usuários.' });
    }
});

// Rota para atualizar um usuário existente
server.put('/usuarios/:id_usuario', async (request, reply) => {
    const { id_usuario } = request.params;
    const body = request.body;

    // Validação de campos obrigatórios
    if (!body.nome || !body.email || !body.senha) {
        const errors = {};
        if (!body.nome) errors.nome = 'Faltou o nome.';
        if (!body.email) errors.email = 'Faltou o e-mail.';
        if (!body.senha) errors.senha = 'Faltou a senha.';
        return reply.status(400).send({ error: 'Campos obrigatórios faltando.', detalhes: errors });
    }

    try {
        await databasePostgres.updateUsuarios(id_usuario, body);
        return reply.status(200).send({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);

        if (error.message.includes('E-mail já está em uso')) {
            return reply.status(400).send({ error: 'O e-mail já está cadastrado. Por favor, use outro.' });
        }

        if (error.message.includes('Usuário não encontrado')) {
            return reply.status(404).send({ error: 'Usuário não encontrado para atualização.' });
        }

        return reply.status(500).send({ error: 'Erro interno ao atualizar usuário.' });
    }
});

// Rota para excluir um usuário
server.delete('/usuarios/:id_usuario', async (request, reply) => {
    const { id_usuario } = request.params;

    try {
        await databasePostgres.deleteUsuarios(id_usuario);
        return reply.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);

        if (error.message.includes('Usuário não encontrado')) {
            return reply.status(404).send({ error: 'Usuário não encontrado para exclusão.' });
        }

        return reply.status(500).send({ error: 'Erro interno ao excluir usuário.' });
    }
});

// Inicia o servidor
server.listen({ port: 3333 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Servidor rodando em http://localhost:3333');
});
