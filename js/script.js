var emailEl = document.getElementById('input-email');
var telefoneEl = document.getElementById('input-telefone');
var mensagemEl = document.getElementById('input-mensagem');
var botaoEnviar = document.getElementById('btn-enviar-contato');
var mensagemForm = document.getElementById('mensagemForm');


function enviarFormulario() {
    
    if (emailEl.value == '') {

        emailEl.focus();
        emailEl.style.borderColor = '#cc3f3f';
        emailEl.style.borderWidth = '3px'
        return mensagemForm.innerText = 'O campo de *email* não pode ser vazio'

    } else if (telefoneEl.value == ''){

        telefoneEl.focus();
        telefoneEl.style.borderColor = '#cc3f3f';
        telefoneEl.style.borderWidth = '3px'
        telefoneEl.style.border.color = '#cc3f3f'
        return mensagemForm.innerHTML = 'O campo *telefone* não pode ser vazio'

    } else {
        mensagemForm.innerHTML = 'Tudo certo! Entraremos em contato com você em breve.';
        mensagemForm.style.color = '#FFF8E8'
        // Tirando as cores das bordas
        emailEl.style.border = 'none';
        telefoneEl.style.border = 'none';

        // Desativando os campos
        emailEl.disabled = true;
        telefoneEl.disabled = true;
        mensagemEl.disabled = true;

        botaoEnviar.disabled = true;
        botaoEnviar.style.backgroundColor = '#555'
        botaoEnviar.style.cursor = 'not-allowed'
        
    }

    botaoEnviar.addEventListener('click', enviarFormulario);
}

// Função de formatação de textos dinâmica
function formatarTexto(formato, campo){
            
    objeto = eval(campo);
    sep1 = "."
    sep2 = "-"
    sep3 = "("
    sep4 = ")"

    if (formato == "cpf"){ // _ _ _ . _ _ _ . _ _ _ - _
        if (objeto.value.length == 3) {
            objeto.value = objeto.value + sep1
        } else if (objeto.value.length == 7) {
            objeto.value = objeto.value + sep1
        } else if (objeto.value.length == 11) {
            objeto.value = objeto.value + sep2
        }
    }

    if (formato == "cep"){ // _ _ _ _ _ - _ _ _
        if (objeto.value.length == 5) {
            objeto.value = objeto.value + sep2
        }
    }

    if (formato == "telefone"){ // ( _ _ ) _ _ _ _ _ - _ _ _ _
        if (objeto.value.length == 0) {
            objeto.value = objeto.value + sep3
        } else if (objeto.value.length == 3) {
            objeto.value = objeto.value + sep4  + " "
        } else if (objeto.value.length == 10) {
            objeto.value = objeto.value + sep2
        }
    }
}

// Funcionalidade de login
var nomeUsuario = document.getElementById('nomeUsuario');
var senhaUsuario = document.getElementById('senhaUsuario')
var erroLogin = document.getElementById('erroLogin');

// Verificando se o login bate com as credenciais de acesso fixa
// Usuário = admin || Senha = 123
function iniciarSessao() {

    if (nomeUsuario == ''){
        erroLogin.innerText = 'O campo usuário não pode ser vazio';
    } else if (senhaUsuario == '') {
        erroLogin.innerText = 'O campo login não pode ser vazio';
    }

    // Para esse exemplo validaremos apenas a senha
    if (senhaUsuario.value == ''){
        console.log('Campos vazios');
        erroLogin.innerText = "Preencha todos os campos!";
    } else if (senhaUsuario.value == '123'){
        console.log('Login bem sucedido!')
        window.location.href = "area-cliente.html"; // Redireciona
        sessionStorage.setItem('logado', 'true');  
        sessionStorage.setItem('usuario', nomeUsuario.value.replace(/\b\w/g, letra => letra.toUpperCase())); 
    } else{
        nomeUsuario.focus();
        console.log('Login inválido')
        erroLogin.innerText = 'Usuário ou Senha inválidos!';
    }
}


// FUNCIONALIDADE DA PÁGINA DE LOGIN!!!!
document.addEventListener('DOMContentLoaded', function() {

    var btnLogin = document.getElementById('btn-login');

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            btnLogin.click();
        }
    });
    
    // Função para fazer logout
    var logoutButton = document.getElementById("btn-logout");
    console.log('clicado')
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            sessionStorage.setItem('logado', 'false');
            sessionStorage.setItem('logado', '');
            sessionStorage.clear();
        });
    }



    // FUNCIONALIDADES DA ÁREA DO CLIENTE
    var campoSaudacoes = document.getElementById('campoSaudacoes');

    campoSaudacoes.innerHTML = "Olá, " + sessionStorage.getItem('usuario') + "!";

    // Pegando os elementos de link
    var linkAssistente = document.getElementById('link-assistente');
    var linkOrcamento = document.getElementById('link-orcamento');
    var linkSimulacao = document.getElementById('link-simulacao');

    // Pegando as seções
    var secaoAssistente = document.getElementById('assistente');
    var secaoOrcamento = document.getElementById('orcamento');
    var secaoSimulacao = document.getElementById('simulacao');

    function exibirSecao(secao) {
        document.querySelectorAll('.secao').forEach(function(secao) {
            secao.classList.add('secao-oculta');  // Adiciona a classe para ocultar
        });

        secao.classList.remove('secao-oculta');  // Remove a classe para exibir
        console.log('Exibindo seção:', secao.id); 
    }

    if (linkAssistente) {
        linkAssistente.addEventListener('click', function(event) {
            event.preventDefault(); 
            console.log('Botão Assistente clicado');  
            exibirSecao(secaoAssistente);
        });
    }

    if (linkOrcamento) {
        linkOrcamento.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Botão Orçamento clicado');
            exibirSecao(secaoOrcamento);
        });
    }

    if (linkSimulacao) {
        linkSimulacao.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Botão Simulação clicado');
            exibirSecao(secaoSimulacao);
        });
    }


    // CHATBOT FICA AQUI!!!

    // Inicializa com a primeira seção visível
    exibirSecao(secaoAssistente);
    window.watsonAssistantChatOptions = {
        integrationID: "274bb353-a96b-46ed-a5f8-df85b5c7f1a5", // The ID of this integration.
        region: "us-south", // The region your integration is hosted in.
        serviceInstanceID: "5040ba4f-1714-4329-912f-74d0d2702376", // The ID of your service instance.
        element: document.getElementById('espaco-chatbot'),
        // Oculta o launcher - Aquela bolinha
        showLauncher: false,
        headerConfig: {
            hideMinimizeButton: true,
        },
        layout: {
          openChatByDefault: true,
          hasContentMaxWidth: false, // Issso aqui deixa a tela cheia no chatbot, deixar como falso
        }, onLoad: async (instance) => { 
            instance.openWindow();
            instance.updateLocale('pt-br');
            await instance.render();   
      }
      };
      setTimeout(function(){
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
    });

});

// CONFIGURAÇÕES DA PÁGINA DE AGENDAMENTO
function atualizarInformacoes(){
    // Atualizar informações do Menu Dropdown
    const servicoEscolhido = document.getElementById('servicos');
    const dataEscolhida = document.getElementById('data');
    const horaEscolhida = document.getElementById('hora');
    const cepEscolhido = document.getElementById('cep');
    const numLocalEscolhido = document.getElementById('numLocal');
    const referenciaEscolhida = document.getElementById('referencia');

    // Obtém o elemento que exibirá a descrição do serviço
    const tituloCard = document.getElementById('tituloCard');
    const descricaoServico = document.getElementById('descricaoServico');
    const informacoesLocal = document.getElementById('informacoesLocal');


    // Atualiza a descrição conforme o serviço escolhido
    switch (servicoEscolhido.value) {
    case 'orcamento':
        tituloCard.innerText = `Informações Agendamento`
        descricaoServico.innerHTML = `<div><span>Serviço: </span>Orçamento</p><div><span>Data: </span>${dataEscolhida.value}<br><span>Hora: </span>${horaEscolhida.value}`;
        informacoesLocal.innerHTML = `<div><span>CEP: </span>${cepEscolhido.value == ''? '-----': cepEscolhido.value }</div><div><span>N° do Local: </span>${numLocalEscolhido.value == ''? '-----': numLocalEscolhido.value }</div><div><span>Referência: </span>${referenciaEscolhida.value == ''? '-----': referenciaEscolhida.value}</div>`;
        
        break;
    case 'instalacao':
        tituloCard.innerText = `Informações Agendamento`
        descricaoServico.innerHTML = `<div><span>Serviço: </span>Instalação</p><div><span>Data: </span>${dataEscolhida.value}<br><span>Hora: </span>${horaEscolhida.value}`;
        informacoesLocal.innerHTML = `<div><span>CEP: </span>${cepEscolhido.value == ''? '-----': cepEscolhido.value }</div><div><span>N° do Local: </span>${numLocalEscolhido.value == ''? '-----': numLocalEscolhido.value }</div><div><span>Referência: </span>${referenciaEscolhida.value == ''? '-----': referenciaEscolhida.value}</div>`;

        break;
    case 'manutencao':
        tituloCard.innerText = `Informações Agendamento`
        descricaoServico.innerHTML = `<div><span>Serviço: </span>Manutenção</p><div><span>Data: </span>${dataEscolhida.value}<br><span>Hora: </span>${horaEscolhida.value}`;
        informacoesLocal.innerHTML = `<div><span>CEP: </span>${cepEscolhido.value == ''? '-----': cepEscolhido.value }</div><div><span>N° do Local: </span>${numLocalEscolhido.value == ''? '-----': numLocalEscolhido.value }</div><div><span>Referência: </span>${referenciaEscolhida.value == ''? '-----': referenciaEscolhida.value}</div>`;

        break;
    default:
        tituloCard.innerText = `Escolha um serviço para realizar o agendamento.`
        break;
}
}

document.getElementById('servicos').addEventListener('change', atualizarInformacoes);
document.getElementById('data').addEventListener('input', atualizarInformacoes); 
document.getElementById('hora').addEventListener('input', atualizarInformacoes); 
document.getElementById('cep').addEventListener('input', atualizarInformacoes);
document.getElementById('numLocal').addEventListener('input', atualizarInformacoes);
document.getElementById('referencia').addEventListener('input', atualizarInformacoes);
