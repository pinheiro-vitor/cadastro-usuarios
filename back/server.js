const express = require('express');
const cors = require('cors');

const app = express();

//configurações do CORS e para permitir JSON

app.use(cors());
app.use(express.json());

//banco de dados em forma de array
const usuarios = [];

//rota post para criar um novo usuário
app.post('/usuarios', (req, res) => {
    // Pegue o nome e email do body da requisição
    const { nome, email } = req.body;

    // para criar o usuário de ID único
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email
    };
    usuarios.push(novoUsuario);

    //retorno
    res.status(201).json(novoUsuario);
});

//rota get para listar os usuários
app.get('/usuarios', (req, res) => {
    // Retorne todos os usuários do array
    res.status(200).json(usuarios);
});

//rota para alterar um usuario

//rota para deletar um usuario
//app.delete('/usuarios')


// porta do servidor
const PORTA = 3000;
app.listen(PORTA,()=>{
    console.log('Servidor rodando na porta ' + PORTA);
})