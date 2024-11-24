import sql from './db.js'; // Importing the default export

sql`
  CREATE TABLE IF NOT EXISTS node_javascript (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    valor INT,
    status VARCHAR(15)
  );
`.then(() => {
    console.log('Tabela criada ou já existia!');
}).catch(err => {
    console.log('Erro ao criar a tabela!');
    console.log(err);
});