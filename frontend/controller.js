const usuarios = []; 
function getUsuarios(req, res) { 
res.json(usuarios); 
} 
function getUsuariosByPlaca(req, res) {
const { email } = req.params; 
const usuarios = usuarios.find(v => v.email === email);
    if (usuarios) { 
    res.json(usuarios); 
    } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
    } 
} 
function createUsuarios(req, res) { 
const { email, senha, nome } = req.body; 

const usuarios = { email, senha, nome };
    usuarios.push(usuarios); 
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' }); 
} 

function updateUsuarios(req, res) { const { email } = req.params; 
    const { nome, senha} = req.body; 
    const usuarios = usuarios.find(v => v.email === email); 
    if (usuarios) { 
        usuarios.senha = senha || usuarios.senha; 
        usuarios.nome = nome || usuarios.nome; 
        res.json({ message: 'Informações do Usuário atualizadas com sucesso.' }); 
        } else { 
        res.status(404).json({ message: 'Usuário não encontrado.' }); 
        } 
} 

function deleteUsuarios(req, res) { 
    const { email } = req.params; 
    const veiculosIndex = usuarios.findIndex(v => v.email === email); 
        if (veiculosIndex !== -1) { 
            usuarios.splice(veiculosIndex, 1); 
        res.json({ message: 'Usuário excluído com sucesso.' }); 
        } else { 
        res.status(404).json({ message: 'Usuário não encontrado.' }); 
} 
} 

module.exports = { getUsuarios, getUsuariosByPlaca, createUsuarios, updateUsuarios, deleteUsuarios};
