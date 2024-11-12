// index.js
require("dotenv").config(); 

const port = process.env.PORT || 5000; // Define uma porta padrão caso PORT não seja definida

const db = require("./db");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Funcionando" });
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await db.selectCustomers();
        res.json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

app.post("/usuarios", async (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario } = req.body;

    try {
        // Inserir o novo usuário no banco de dados
        const client = await db.connect();
        await client.query(
            "INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario) VALUES ($1, $2, $3)",
            [nome_usuario, email_usuario, senha_usuario]
        );
        client.release();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
});

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});
