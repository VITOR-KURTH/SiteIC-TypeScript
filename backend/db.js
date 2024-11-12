// db.js
const { Pool } = require('pg');

async function connect() {
    if (global.connection) 
        return global.connection;

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    console.log("Criou o pool de conexão");

    // Teste a conexão inicial
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool;
}

// Função para selecionar os usuários
async function selectCustomers() {
    const pool = await connect();
    const client = await pool.connect();
    const res = await client.query("SELECT * FROM usuarios");
    client.release();
    return res.rows;
}

module.exports = {
    selectCustomers
};
