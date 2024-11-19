import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { UsuariosAll } from './database-postgres.js';

const server = fastify();
const databasePostgres = new UsuariosAll();

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// CREATE
server.post('/usuarios', async (request, reply) => {
    const body = request.body;
    console.log(body);

    let error = {};

    if (!body.nome) error.nome = 'Faltou o nome';

    if (!body.senha) error.senha = 'Faltou a senha';
    
    if (!body.email) error.email = 'Faltou o email';

    if (Object.keys(error).length === 0) {
        await databasePostgres.createUsuarios(body);
        return reply.status(201).send('Executado com sucesso');
    } else {
        return reply.status(400).send(error);
    }
});

// READ
server.get('/usuarios', async () => {
    const users = await databasePostgres.listUsuarios();
    return users;
});

// UPDATE
server.put('/usuarios/:id_usuario', async (request, reply) => {
    const userID = request.params.id_usuario;
    const body = request.body;

    let error = {};

    if (!body.nome) error.nome = 'Faltou o nome';
    if (!body.senha) error.senha = 'Faltou a senha';
    if (!body.email) error.email = 'Faltou o email';
    if (!userID) error.userID = 'Faltou o ID';

    if (Object.keys(error).length === 0) {
        await databasePostgres.updateUsuarios(userID, body);
        return reply.status(200).send('Usuário atualizado com sucesso');
    } else {
        return reply.status(400).send(error);
    }
});

// DELETE
server.delete('/usuarios/:id_usuario', async (request, reply) => {
    const userID = request.params.id_usuario;
    await databasePostgres.deleteUsuarios(userID);
    return reply.status(204).send();
});

// Iniciar servidor
server.listen({ port: 3333 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Servidor rodando em http://localhost:3333');
});
