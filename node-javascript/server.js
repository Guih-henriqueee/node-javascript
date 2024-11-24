'use strict';

import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres();

// Rota simples para verificar se o servidor está funcionando
server.get('/', async (request, reply) => {
    return reply.status(200).send({ message: 'Hello, Render!' });
});

// Rota para listar itens
server.get('/listItems', async (request, response) => {
    const search = request.query.search;
    const items = await database.list(search);
    return response.status(200).send(items);
});

// Rota para inserir novos itens
server.post('/insertItems', async (request, response) => {
    const { title, description, value, status } = request.body;
    await database.create({
        title,
        description,
        value,
        status
    });
    console.log(await database.list());
    return response.status(201).send({ message: 'Item created successfully' });
});

// Rota para atualizar um item
server.put('/Items/:id', async (request, response) => {
    const itemId = request.params.id;
    const { title, description, value, status } = request.body;
    await database.update(itemId, {
        title,
        description,
        value,
        status
    });
    return response.status(204).send();
});

// Rota para deletar um item
server.delete('/Items/:id', async (request, response) => {
    const itemId = request.params.id;
    await database.delete(itemId);
    return response.status(204).send();
});

// Configuração de Porta e Host
const PORT = process.env.PORT || 3000; // Utiliza a variável PORT ou 3000 por padrão
const HOST = '0.0.0.0'; // O servidor precisa estar escutando em 0.0.0.0 no Render

// Iniciando o servidor
server.listen(PORT, HOST, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});
