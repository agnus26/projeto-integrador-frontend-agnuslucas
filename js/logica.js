/**
 * TEMA: Portfólio de Projetos Front-end
 * ENTRADA: Número mínimo de horas estimadas para filtrar projetos prioritários.
 * PROCESSAMENTO: Validação da entrada, classificação do nível de complexidade com if/else, 
 * categorização por tecnologia com switch, e cálculo de estatísticas (total de horas e média) com for...of, 
 * além de um loop while para simular busca de comandos até digitar "sair".
 * SAÍDA: Relatórios formatados com template literals e console.table.
 * 
 * PSEUDOCÓDIGO:
 * 1. Definir array com 5 objetos (projetos).
 * 2. Solicitar limite de horas via prompt e validar dados.
 * 3. Percorrer os projetos classificando a complexidade (if/else if/else).
 * 4. Usar switch para definir a mensagem baseada na tecnologia principal.
 * 5. Calcular total de horas e média usando laço for...of.
 * 6. Executar laço while solicitando busca até o usuário digitar "sair".
 * 7. Exibir resultados no console com template literals e console.table.
 */

// 2. Declaração dos dados (Array com pelo menos 5 objetos e 3+ propriedades)
const projetos = [
    { nome: "Landing Page", horas: 15, tecnologia: "html" },
    { nome: "App de Clima", horas: 40, tecnologia: "javascript" },
    { nome: "Dashboard", horas: 80, tecnologia: "react" },
    { nome: "Portfólio Pessoal", horas: 20, tecnologia: "html" },
    { nome: "E-commerce Simples", horas: 60, tecnologia: "javascript" }
];

// 3. Entrada com prompt e validação rigorosa
let entrada = prompt("Digite o limite mínimo de horas para filtrar os projetos:");

// Validação: Cancelar (null), vazio, NaN ou fora da faixa aceitável (ex: 0 a 200)
let limiteHoras = Number(entrada);
if (entrada === null || entrada.trim() === "" || isNaN(limiteHoras) || limiteHoras < 0 || limiteHoras > 200) {
    console.warn("Entrada inválida! Usando valor padrão de 20 horas.");
    limiteHoras = 20;
} else {
    console.log(`Filtro aplicado com sucesso para projetos acima de ${limiteHoras} horas.`);
}

// 4. Classificação com if / else if / else
console.log("\n--- CLASSIFICAÇÃO DE COMPLEXIDADE DOS PROJETOS ---");
for (let i = 0; i < projetos.length; i++) {
    let p = projetos[i];
    let complexidade;

    if (p.horas <= 20) {
        complexidade = "Simples";
    } else if (p.horas <= 50) {
        complexidade = "Intermediário";
    } else {
        complexidade = "Avançado";
    }

    console.log(`Projeto: ${p.nome} | Horas: ${p.horas}h | Nível: ${complexidade}`);
}

// 5. Uso do switch com break e default
console.log("\n--- MENSAGEM POR TECNOLOGIA (SWITCH) ---");
for (let p of projetos) {
    let mensagemTecnologia = "";

    switch (p.tecnologia) {
        case "html":
            mensagemTecnologia = "Foco em estrutura e semântica básica.";
            break;
        case "javascript":
            mensagemTecnologia = "Foco em lógica, interatividade e manipulação do DOM.";
            break;
        case "react":
            mensagemTecnologia = "Foco em componentes modernos e gerenciamento de estado.";
            break;
        default:
            mensagemTecnologia = "Tecnologia versátil para desenvolvimento web.";
            break;
    }

    console.log(`[${p.tecnologia.toUpperCase()}] ${p.nome}: ${mensagemTecnologia}`);
}

// 6. Resumo com laço (for...of com acumulador e contador)
let totalHoras = 0;
let projetosFiltradosCount = 0;

for (let p of projetos) {
    totalHoras += p.horas;
    if (p.horas >= limiteHoras) {
        projetosFiltradosCount++;
    }
}

let mediaHoras = totalHoras / projetos.length;

console.log("\n--- RESUMO GERAL ---");
console.log(`Total de horas gastas em todos os projetos: ${totalHoras}h`);
console.log(`Média de horas por projeto: ${mediaHoras.toFixed(1)}h`);
console.log(`Projetos que exigem ${limiteHoras}h ou mais: ${projetosFiltradosCount}`);

// 7. Uso de while com condição de saída
console.log("\n--- SIMULAÇÃO DE BUSCA INTERATIVA (WHILE) ---");
let comando = "";
let tentativas = 0;
while (comando !== "sair" && tentativas < 3) {
    comando = prompt("Digite o nome de uma tecnologia para buscar (html, javascript, react) ou digite 'sair':");
    if (comando === null) {
        comando = "sair"; // Trata o cancelamento do prompt
    }
    comando = comando.toLowerCase().trim();

    if (comando === "sair") {
        console.log("Encerrando a busca interativa.");
    } else {
        let encontrado = false;
        for (let p of projetos) {
            if (p.tecnologia === comando) {
                console.log(`-> Encontrado: ${p.nome} (${p.horas}h)`);
                encontrado = true;
            }
        }
        if (!encontrado && comando !== "sair") {
            console.log(`Nenhum projeto encontrado para a tecnologia '${comando}'.`);
        }
    }
    tentativas++;
}

// 8. Exibição com template literal e console.table
console.log(`\nRelatório final gerado com sucesso para o portfólio de projetos.`);
console.table(projetos);

/**
 * 9. TESTE DE MESA (Primeiras 3 voltas do laço principal de classificação)
 * -----------------------------------------------------------------------------------------
 * Volta | Índice (i) | p.nome                | p.horas | Condição (p.horas <= 20) | Saída (Complexidade)
 * -----------------------------------------------------------------------------------------
 * 1     | 0         | "Landing Page"        | 15      | 15 <= 20 (Verdadeiro)    | "Simples"
 * 2     | 1         | "App de Clima"        | 40      | 40 <= 20 (Falso -> ... ) | "Intermediário"
 * 3     | 2         | "Dashboard"           | 80      | 80 <= 20 (Falso -> ... ) | "Avançado"
 * -----------------------------------------------------------------------------------------
 */