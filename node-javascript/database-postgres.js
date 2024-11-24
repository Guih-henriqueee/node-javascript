import { randomUUID } from "node:crypto"
import sql from './db.js'

export class DatabasePostgres {
    async list(search) {
        let items

        if (search) {
            items = await sql`select * from node_javascript where title ilike ${'%' + search + '%'}`
        } else {
            items = await sql`select * from node_javascript`
        }
        return items

    }


    async create(item) {
        const itemID = randomUUID()
        const { title, description, value, status } = item

        await sql`insert into node_javascript (itemid, title, description, valor, status) VALUES (${itemID}, ${title}, ${description}, ${value},${status} )`
    }


    async update(id, item) {
        const { title, description, value, status } = item
        await sql`update node_javascript set title = ${title}, description = ${description}, valor = ${value}, status = ${status} WHERE itemid = ${id}`
    }

    async delete(id) {
        const {id: itemID} = await sql`delete from node_javascript where itemid = ${id} returning itemid`
        return itemID
    }
    }


