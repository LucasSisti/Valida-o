const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar o uso de views (usando EJS como exemplo)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Função para validar dados do formulário
function validarDados(dados) {
    const erros = {};

    // Adicione validações conforme necessário
    // Exemplo: Verificar se o campo nome está preenchido
    if (!dados.txtnome) {
        erros.nome = 'Campo obrigatório.';
    }

    // Adicione outras validações aqui...

    return erros; // Retorna o objeto de erros
}

app.post('/cadastro', (req, res) => {
    const dados = req.body;

    // Validar dados
    const errosValidacao = validarDados(dados);

    if (Object.keys(errosValidacao).length > 0) {
        return res.render('formulario', {
            mensagemErroNome: errosValidacao.nome,
            mensagemErroDataNascimento: errosValidacao.dataNascimento,
            mensagemErroEndereco: errosValidacao.endereco,
            mensagemErroEmail: errosValidacao.email,
            mensagemErroSexo: errosValidacao.sexo,
            mensagemErroSenha: errosValidacao.senha,
            mensagemErroSenhaConfirmacao: errosValidacao.senhaConfirmacao,
            mensagemErroAnimais: errosValidacao.animais,
            dadosFormulario: dados,
        });
    }

    // Se não houver erros, continue com o processamento dos dados
    console.log('Dados do formulário:', dados);
    res.send('Formulário recebido com sucesso!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
