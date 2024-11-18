const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/', routes);

    const port = 3000;
    app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
