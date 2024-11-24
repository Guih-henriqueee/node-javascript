'use strict';

import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';


const server = fastify()
const database = new DatabasePostgres()


server.get('/', (request, response)=> {

	return response.status(200).send()
})

// GET, POST, PUT, DELETE, PATCH, HEAD, OPTINONS
// Route Parametert


server.get('/listItems', async (request, response) => {
	const search = request.query.search

	const items = await  database.list(search)

	return response.status(200).send(items)
});
  
server.post('/insertItems', async (request, response) => {
	const { title, description, value, status } = request.body

	await database.create({
		title,
		description,
		value,
		status
	})

	console.log(database.list())
	
	

	return response.status(201).send()
})

server.put('/Items/:id', async (request, response) => {
	const itemId = request.params.id
	const { title, description, value, status } = request.body
	await database.update(itemId, {
		title,
		description,
		value,
		status
	})

	return response.status(204).send()
})



server.delete('/Items/:id', async (request, response) => {
	const itemId = request.params.id

	await database.delete(itemId)
	return response.status(204).send()

})





server.listen({
	port: process.env.PORT ?? 3000,
})