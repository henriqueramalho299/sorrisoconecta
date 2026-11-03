'use strict';
document.documentElement.classList.add('js');

// O menu ocupa espaço no fluxo da página, sem cobrir os controles.
const menuBotao = document.querySelector('.menu-botao');
const menu = document.querySelector('#menu-principal');
function fecharMenu() {
    menu.classList.remove('aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
}
menuBotao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBotao.setAttribute('aria-expanded', String(aberto));
});
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
        fecharMenu();
        menuBotao.focus();
    }
});
menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) fecharMenu();
});

const formulario = document.querySelector('#form-contato');
function mensagemCampo(campo) {
    if (campo.type === 'checkbox') return campo.checked ? '' : 'Marque a autorização para concluir este exemplo.';
    const valor = campo.value.trim();
    if (!valor) return 'Preencha este campo.';
    if (campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'Informe um e-mail como nome@exemplo.com.';
    if (campo.id === 'nome' && valor.length < 2) return 'Informe pelo menos dois caracteres.';
    if (campo.id === 'mensagem' && valor.length < 10) return 'Descreva sua disponibilidade com pelo menos dez caracteres.';
    return '';
}
function validarCampo(campo) {
    const mensagem = mensagemCampo(campo);
    const aviso = document.getElementById(campo.id + '-erro');
    aviso.textContent = mensagem;
    campo.setAttribute('aria-invalid', String(Boolean(mensagem)));
    return !mensagem;
}
if (formulario) {
    const campos = [...formulario.querySelectorAll('input, select, textarea')];
    const parametros = new URLSearchParams(location.search);
    for (const id of ['apoio', 'programa']) {
        const campo = document.getElementById(id);
        if ([...campo.options].some(opcao => opcao.value === parametros.get(id))) campo.value = parametros.get(id);
    }
    for (const campo of campos) {
        const aviso = document.createElement('span');
        aviso.id = campo.id + '-erro';
        aviso.className = 'erro-campo';
        campo.setAttribute('aria-describedby', aviso.id);
        campo.parentElement.append(aviso);
        campo.addEventListener(campo.type === 'checkbox' || campo.tagName === 'SELECT' ? 'change' : 'input', () => {
            if (formulario.dataset.tentou) validarCampo(campo);
        });
    }
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        formulario.dataset.tentou = 'sim';
        const validacoes = campos.map(validarCampo);
        const retorno = document.getElementById('retorno');
        retorno.classList.remove('sucesso');
        if (validacoes.includes(false)) {
            retorno.textContent = 'Confira os campos destacados para continuar.';
            campos[validacoes.indexOf(false)].focus();
            return;
        }
        retorno.textContent = 'Simulação concluída. Seu preenchimento foi validado; nenhuma informação foi enviada ou armazenada.';
        retorno.classList.add('sucesso');
        formulario.reset();
        delete formulario.dataset.tentou;
        campos.forEach(campo => campo.removeAttribute('aria-invalid'));
    });
}

const filtroCampanha = document.querySelector('#filtro-campanha');
if (filtroCampanha) filtroCampanha.addEventListener('change', () => {
    document.querySelectorAll('#lista-campanhas .campanha').forEach(card => {
        card.hidden = filtroCampanha.value !== 'Todas' && card.querySelector('.etiqueta').textContent !== filtroCampanha.value;
    });
});

const campanhas = [
    {id: 1, nome: 'Vozes do Bairro', cidade: 'São Paulo', programa: 'Dentista do Bem', modalidade: 'Divulgação', ativa: true},
    {id: 2, nome: 'Rede de Materiais', cidade: 'São Paulo', programa: 'Dentista do Bem', modalidade: 'Materiais', ativa: true},
    {id: 3, nome: 'Recomeço em Rede', cidade: 'São Paulo', programa: 'Apolônias do Bem', modalidade: 'Dinheiro', ativa: true}
];
const exemplos = [
    {id: 1, nome: 'Papelaria Ponte', cidade: 'São Paulo', programa: 'Dentista do Bem', modalidade: 'Divulgação', interesse: 3, dias: 16, autorizado: true},
    {id: 2, nome: 'Marina Exemplo', cidade: 'São Paulo', programa: 'Dentista do Bem', modalidade: 'Divulgação', interesse: 2, dias: 9, autorizado: true},
    {id: 3, nome: 'Loja Horizonte', cidade: 'São Paulo', programa: 'Apolônias do Bem', modalidade: 'Dinheiro', interesse: 3, dias: 20, autorizado: false},
    {id: 4, nome: 'Oficina Aurora', cidade: 'São Paulo', programa: 'Dentista do Bem', modalidade: 'Materiais', interesse: 3, dias: 15, autorizado: true},
    {id: 5, nome: 'Ana Exemplo', cidade: 'São Paulo', programa: 'Apolônias do Bem', modalidade: 'Dinheiro', interesse: 1, dias: 4, autorizado: true}
];
let apoiadores = exemplos.map(item => ({...item}));
let contatos = 0;
function calcularPrioridade(apoiador, campanha) {
    if (!campanha.ativa || !apoiador.autorizado || ['cidade', 'programa', 'modalidade'].some(chave => apoiador[chave] !== campanha[chave])) return null;
    const tempo = apoiador.dias >= 15 ? 20 : apoiador.dias >= 7 ? 10 : 0;
    const pontos = apoiador.interesse * 10 + 50 + tempo;
    return {pontos, tempo, faixa: pontos >= 90 ? 'Prioritário' : pontos >= 70 ? 'Aproximação' : 'Acompanhamento'};
}
function criarCelula(rotulo, texto) {
    const celula = document.createElement('td');
    celula.dataset.label = rotulo;
    celula.textContent = texto;
    return celula;
}
function atualizarRadar() {
    const campanha = campanhas.find(item => item.id === Number(document.querySelector('#campanha-radar').value));
    const busca = document.querySelector('#busca-radar').value.trim().toLocaleLowerCase('pt-BR');
    const todos = apoiadores.map(apoiador => ({apoiador, resultado: calcularPrioridade(apoiador, campanha)})).filter(item => item.resultado);
    const resultados = todos.filter(item => item.apoiador.nome.toLocaleLowerCase('pt-BR').includes(busca)).sort((a, b) => b.resultado.pontos - a.resultado.pontos || a.apoiador.id - b.apoiador.id);
    document.querySelector('#total-radar').textContent = todos.length;
    document.querySelector('#prioritarios-radar').textContent = resultados.filter(item => item.resultado.pontos >= 90).length;
    document.querySelector('#contatos-radar').textContent = contatos;
    document.querySelector('#titulo-radar').textContent = campanha.nome + ' · ' + campanha.cidade + ' · ' + campanha.modalidade;
    const corpo = document.querySelector('#linhas-radar');
    corpo.replaceChildren();
    for (const {apoiador, resultado} of resultados) {
        const linha = document.createElement('tr');
        linha.append(criarCelula('Apoiador', apoiador.nome), criarCelula('Prioridade', resultado.pontos + '/100 · ' + resultado.faixa), criarCelula('Motivo', 'Interesse +' + apoiador.interesse * 10 + ', compatibilidade +50, ' + apoiador.dias + ' dias sem contato +' + resultado.tempo + '.'));
        const acao = criarCelula('Ação', '');
        const botao = document.createElement('button');
        botao.type = 'button'; botao.className = 'botao botao-claro';
        botao.textContent = apoiador.dias === 0 ? 'Contato registrado hoje' : 'Simular contato hoje';
        botao.disabled = apoiador.dias === 0;
        botao.addEventListener('click', () => {
            apoiador.dias = 0; contatos++;
            atualizarRadar();
            document.querySelector('#feedback-radar').textContent = 'Contato de demonstração registrado para ' + apoiador.nome + '. A prioridade foi recalculada. Nenhuma mensagem foi enviada.';
        });
        acao.append(botao); linha.append(acao); corpo.append(linha);
    }
    if (!resultados.length) {
        const linha = document.createElement('tr');
        const celula = criarCelula('Resultado', 'Nenhum apoiador corresponde aos filtros atuais.');
        celula.colSpan = 4; linha.append(celula); corpo.append(linha);
    }
}
if (document.querySelector('#campanha-radar')) {
    document.querySelector('#campanha-radar').addEventListener('change', atualizarRadar);
    document.querySelector('#busca-radar').addEventListener('input', atualizarRadar);
    document.querySelector('#restaurar-radar').addEventListener('click', () => {
        apoiadores = exemplos.map(item => ({...item})); contatos = 0;
        document.querySelector('#busca-radar').value = '';
        atualizarRadar();
        document.querySelector('#feedback-radar').textContent = 'Os exemplos iniciais foram restaurados.';
    });
    atualizarRadar();
}
