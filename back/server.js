const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());


const ARQUIVO_DADOS = 'banco.json';

function lerUsuarios() {
    try {
        
        const dados = fs.readFileSync(ARQUIVO_DADOS, 'utf8');
        return JSON.parse(dados); 
    } catch (erro) {
        return [];
    }
}

function salvarUsuarios(dados) {
    fs.writeFileSync(ARQUIVO_DADOS, JSON.stringify(dados, null, 2));
}


app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    const usuarios = lerUsuarios();

    const emailJaExiste = usuarios.find(usuario => usuario.email === email);

    if (emailJaExiste) {
        return res.status(400).json({ erro: 'Erro ao cadastrar usuário: Email já cadastrado!' });
    }


    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    res.status(201).json(novoUsuario);
});



app.get('/usuarios', (req, res) => {
    const usuarios = lerUsuarios();
    res.status(200).json(usuarios);
});


app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;

    const usuarios = lerUsuarios();

    const index = usuarios.findIndex( usuario => usuario.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const emailJaExiste = usuarios.find(usuario => usuario.email === email && usuario.id !== id);

    if (emailJaExiste) {
        return res.status(400).json({ erro: 'Erro ao editar usuário: Email já cadastrado!' });
    }

    usuarios[index].nome = nome || usuarios[index].nome; 
    usuarios[index].email = email || usuarios[index].email;

    salvarUsuarios(usuarios);
    res.status(200).json({ mensagem: 'Usuário atualizado!', usuario: usuarios[index] });
});


app.delete('/usuarios/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    let usuarios = lerUsuarios();
    const index = usuarios.findIndex( usuario => usuario.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);
    salvarUsuarios(usuarios);
    res.status(200).json({ mensagem: 'Usuário deletado!' });
});




const PORTA = 3000;
app.listen(PORTA,()=>{
    console.log('Servidor rodando na porta ' + PORTA);
})