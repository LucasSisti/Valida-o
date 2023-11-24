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

    // Adicione suas regras de validação aqui
    // Exemplo: Verificar se o campo nome está preenchido
    if (!dados.txtnome) {
        erros.nome = 'Campo obrigatório.';
    }

    // Adicione mais verificações conforme necessário

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
    res.render('formulario', { mensagemErroNome: '' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
