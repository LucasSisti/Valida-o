const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Função para validar dados do formulário
function validarDados(dados) {
    const erros = {};

    // Verificar se campos obrigatórios estão preenchidos
    if (!dados.txtnome) {
        erros.nome = 'Campo obrigatório.';
    }

    if (!dados.txtend) {
        erros.endereco = 'Campo obrigatório.';
    }

    if (!dados.txtemail) {
        erros.email = 'Campo obrigatório.';
    }

    if (!dados.txtdtnascimento) {
        erros.dataNascimento = 'Campo obrigatório.';
    }

    if (!dados.txtsenha) {
        erros.senha = 'Campo obrigatório.';
    }

    if (!dados.txtsenhaconfirmacao) {
        erros.senhaConfirmacao = 'Campo obrigatório.';
    }

    if (!dados.opcaosexo) {
        erros.sexo = 'Campo obrigatório.';
    }

    if (!dados.opcaoanimal) {
        erros.animais = 'Campo obrigatório.';
    }

    // Verificar se as senhas estão certas
    if (dados.txtsenha !== dados.txtsenhaconfirmacao) {
        erros.senhaConfirmacao = 'As senhas não correspondem.';
    }

    // Verificar o formato da data de nascimento (assumindo formato DD/MM/AAAA)
    const regexDataNascimento = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexDataNascimento.test(dados.txtdtnascimento)) {
        erros.dataNascimento = 'Formato de data de nascimento inválido. Use o formato DD/MM/AAAA.';
    }

    // Verificando o formato do e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(dados.txtemail)) {
        erros.email = 'Formato de e-mail inválido.';
    }

    return erros; // Retorna o objeto de erros
}

app.post('/cadastro', (req, res) => {
    const dados = req.body;

    // Validar dados
    const errosValidacao = validarDados(dados);

    if (Object.keys(errosValidacao).length > 0) {
        // Se houver erros, renderize o formulário novamente com mensagens de erro
        return res.render('formulario', {
            mensagemErroNome: errosValidacao.nome,
            mensagemErroEndereco: errosValidacao.endereco,
            mensagemErroEmail: errosValidacao.email,
            mensagemErroDataNascimento: errosValidacao.dataNascimento,
            mensagemErroSenha: errosValidacao.senha,
            mensagemErroSenhaConfirmacao: errosValidacao.senhaConfirmacao,
            mensagemErroSexo: errosValidacao.sexo,
            mensagemErroAnimais: errosValidacao.animais,
            // Passe os dados do formulário de volta para o formulário para manter os valores preenchidos
            dadosFormulario: dados,
        });
    }

    // Se não houver erros, você pode prosseguir com o processamento dos dados
    console.log('Dados do formulário:', dados);
    
    // Aqui você pode adicionar lógica adicional para processar os dados

    // Em vez de enviar 'Formulário recebido com sucesso!', você pode redirecionar ou enviar uma resposta adequada
    res.send('Formulário recebido com sucesso!');
});

// Configurando o mecanismo de visualização EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota para renderizar o formulário inicial
app.get('/', (req, res) => {
    res.render('formulario', {
        mensagemErroNome: '',
        mensagemErroEndereco: '',
        mensagemErroEmail: '',
        mensagemErroDataNascimento: '',
        mensagemErroSenha: '',
        mensagemErroSenhaConfirmacao: '',
        mensagemErroSexo: '',
        mensagemErroAnimais: '',
        dadosFormulario: {},
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
