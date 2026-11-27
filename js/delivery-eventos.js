/**
 * AULA 12: DOM Aprofundado e Eventos
 * TEMA: Sistema de Delivery - Interatividade, Delegação e Acessibilidade
 */

// 1. Fonte de Verdade (Dados do Delivery)
const cardapioDados = [
    { id: 1, nome: "Bowl Saudável de Frango", preco: 35.00, categoria: "Almoço", nota: 4.8 },
    { id: 2, nome: "Salada Tropical", preco: 28.50, categoria: "Saladas", nota: 4.5 },
    { id: 3, nome: "Hambúrguer Artesanal", preco: 42.00, categoria: "Lanches", nota: 4.9 },
    { id: 4, nome: "Suco Natural de Laranja", preco: 12.00, categoria: "Bebidas", nota: 4.2 },
    { id: 5, nome: "Açaí na Tigela", preco: 22.00, categoria: "Sobremesas", nota: 4.7 }
];

const favoritos = new Set();

// 2. Funções Puras e Formatação
const formatarMoeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// 3. Gestão do Menu Hambúrguer (Acessibilidade e Tecla Escape)
const menuPrincipal = document.querySelector('#menu-principal') || document.querySelector('nav ul');
const botaoMenu = document.querySelector('.menu-hamburguer');

function alternarMenu() {
    if (!menuPrincipal || !botaoMenu) return;
    const aberto = menuPrincipal.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

function fecharMenuComEscape(evento) {
    if (evento.key === 'Escape' && menuPrincipal && menuPrincipal.classList.contains('aberto')) {
        alternarMenu();
        botaoMenu.focus();
    }
}

function iniciarMenu() {
    if (botaoMenu && menuPrincipal) {
        botaoMenu.addEventListener('click', alternarMenu);
        document.addEventListener('keydown', fecharMenuComEscape);
    }
}

// 4. Delegação de Eventos para Favoritos
const gradeCardapio = document.querySelector('.grade-cardapio') || document.querySelector('main') || document.body;

function alternarFavorito(botao) {
    const card = botao.closest('article') || botao.closest('.card-prato');
    if (!card) return;
    
    // Identifica o prato pelo título ou atributo
    const nomePrato = card.dataset.nome || card.querySelector('h3')?.textContent;
    if (!nomePrato) return;

    const marcado = !favoritos.has(nomePrato);
    if (marcado) {
        favoritos.add(nomePrato);
    } else {
        favoritos.delete(nomePrato);
    }
    
    botao.setAttribute('aria-pressed', String(marcado));
    atualizarResumo();
}

function aoClicarNaGrade(evento) {
    const botao = evento.target.closest('.botao-favoritar');
    if (botao) {
        alternarFavorito(botao);
    }
}

function iniciarFavoritos() {
    if (gradeCardapio) {
        gradeCardapio.addEventListener('click', aoClicarNaGrade);
    }
}

// 5. Painel de Resumo Reativo (Atualiza-se automaticamente)
function criarPainelResumo() {
    const painel = document.createElement('section');
    painel.className = 'resumo-catalogo';
    
    const titulo = document.createElement('h3');
    titulo.textContent = 'Resumo do Cardápio';
    
    const lista = document.createElement('ul');
    lista.id = 'lista-resumo-conteudo';
    
    painel.append(titulo, lista);
    
    const localInsercao = document.querySelector('main h2') || document.querySelector('main') || document.body;
    localInsercao.after(painel);
}

function atualizarResumo() {
    const lista = document.querySelector('#lista-resumo-conteudo');
    if (!lista) return;

    const totalItens = cardapioDados.length;
    const precoTotal = cardapioDados.reduce((soma, p) => soma + p.preco, 0);
    const mediaPreco = totalItens > 0 ? precoTotal / totalItens : 0;

    const linhas = [
        ['Itens no cardápio', totalItens],
        ['Preço médio', formatarMoeda(mediaPreco)],
        ['Favoritos', favoritos.size]
    ];

    lista.replaceChildren(...linhas.map(([rotulo, valor]) => {
        const item = document.createElement('li');
        item.textContent = `${rotulo}: ${valor}`;
        return item;
    }));
}

// 6. Inicialização de Todos os Recursos
function iniciarTudo() {
    iniciarMenu();
    iniciarFavoritos();
    criarPainelResumo();
    atualizarResumo();
}

iniciarTudo();