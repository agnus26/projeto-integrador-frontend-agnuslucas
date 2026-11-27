/**
 * TEMA: Sistema de Delivery - Análise e Manipulação do DOM
 * CONCEITOS: Funções puras, arrow functions, métodos de array (map, filter, reduce) e DOM.
 */

// 1. Dados dos produtos/pratos do delivery (simulando dados que podem vir de cards ou API)
const pratos = [
    { nome: "Bowl Saudável de Frango", preco: 35.00, categoria: "Almoço", nota: 4.8 },
    { nome: "Salada Tropical", preco: 28.50, categoria: "Saladas", nota: 4.5 },
    { nome: "Hambúrguer Artesanal", preco: 42.00, categoria: "Lanches", nota: 4.9 },
    { nome: "Suco Natural de Laranja", preco: 12.00, categoria: "Bebidas", nota: 4.2 },
    { nome: "Açaí na Tigela", preco: 22.00, categoria: "Sobremesas", nota: 4.7 }
];

// 2. Funções Puras (Cálculos e Classificações)
const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const classificarPrato = (nota) => {
    if (nota >= 4.8) return "Destaque";
    if (nota >= 4.5) return "Recomendado";
    return "Tradicional";
};

// 3. Uso de Métodos de Array (map, filter, reduce)
// Mapeia os pratos adicionando a classificação
const relatorioPratos = pratos.map((prato) => ({
    nome: prato.nome,
    precoFormatado: formatarMoeda(prato.preco),
    classificacao: classificarPrato(prato.nota)
}));
console.table(relatorioPratos);

// Filtra apenas os pratos com nota >= 4.5
const pratosDestaque = pratos.filter((prato) => prato.nota >= 4.5);
console.log("Pratos em Destaque/Recomendados:", pratosDestaque.map(p => p.nome));

// Reduce para calcular o preço médio do cardápio
const precoTotal = pratos.reduce((soma, prato) => soma + prato.preco, 0);
const precoMedio = precoTotal / pratos.length;
console.log(`Preço médio dos itens no cardápio: ${formatarMoeda(precoMedio)}`);

// 4. Manipulação do DOM (Leitura e Inserção de Elementos)
// Classes de estilo para as faixas de avaliação
const CLASSES_FAIXA = {
    "Destaque": "faixa-destaque",
    "Recomendado": "faixa-recomendado",
    "Tradicional": "faixa-tradicional"
};

// Função para injetar informações nos cards existentes da página (se houverem)
function enriquecerCards() {
    const cards = document.querySelectorAll(".card-prato, article, .menu-item");
    
    if (cards.length === 0) {
        console.log("Nenhum card estático encontrado para enriquecer via DOM, criando painel de resumo...");
        return;
    }

    cards.forEach((card, index) => {
        if (pratos[index]) {
            const p = pratos[index];
            const faixa = classificarPrato(p.nota);

            // Cria um elemento com createElement e textContent (Seguro contra XSS)
            const infoExtra = document.createElement("p");
            infoExtra.className = "info-dom-extra";
            infoExtra.textContent = `Avaliação: ${p.nota} (${faixa})`;
            
            card.classList.add(CLASSES_FAIXA[faixa]);
            card.append(infoExtra);
        }
    });
}

// 5. Criando um Painel de Resumo do Cardápio via JavaScript
function montarPainelResumo(listaPratos) {
    const painel = document.createElement("section");
    painel.className = "resumo-cardapio";

    const titulo = document.createElement("h3");
    titulo.textContent = "Resumo do Cardápio";

    const totalItens = document.createElement("p");
    totalItens.textContent = `Total de itens cadastrados: ${listaPratos.length}`;

    const mediaPreco = document.createElement("p");
    const soma = listaPratos.reduce((acc, p) => acc + p.preco, 0);
    mediaPreco.textContent = `Preço Médio: ${formatarMoeda(soma / listaPratos.length)}`;

    painel.append(titulo, totalItens, mediaPreco);
    return painel;
}

// Executa as interações com o DOM assim que o script carrega (graças ao 'defer')
enriquecerCards();

// Insere o painel de resumo antes do rodapé ou no elemento principal
const containerPrincipal = document.querySelector("main") || document.body;
containerPrincipal.append(montarPainelResumo(pratos));
