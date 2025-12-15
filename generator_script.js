/* generator_script.js - Cliente Burro (Faz apenas a requisição HTTP) */

// ✅ URL CORRETA DA FUNÇÃO DE GERAÇÃO NO NETLIFY
const API_GENERATE_URL = 'https://teal-pudding-cc9e1b.netlify.app/.netlify/functions/generate'; 

const PERIODOS = {
    '3': 3,
    '7': 7
};

// --- LÓGICA DO SPLASH SCREEN/LOADER ---

document.addEventListener('DOMContentLoaded', () => {
    const splashLoader = document.getElementById('splashLoader');
    
    // 💡 Tempo que o splash screen ficará visível (Ex: 2000ms = 2 segundos)
    const splashDuration = 5000; 

    // Simula o tempo de carregamento e esconde o loader
    setTimeout(() => {
        if (splashLoader) {
            // 1. Adiciona a classe 'fade-out' para iniciar a transição de opacidade (CSS)
            splashLoader.classList.add('fade-out');
            
            // 2. Remove o elemento do DOM após a transição (500ms é o tempo definido no CSS)
            setTimeout(() => {
                splashLoader.remove();
            }, 500); 
        }
        
        // Opcional: Garante que o conteúdo principal fique visível
        // (Seu CSS já trata disso, mas é uma boa prática)
        const appContainer = document.querySelector('.generator-container');
        if(appContainer) {
             // Você pode adicionar uma classe aqui para mostrar o container principal suavemente,
             // mas como o loader está na frente, remover ele já revela o conteúdo.
        }

    }, splashDuration);
});

// --- LÓGICA DE INTERFACE ---

document.getElementById('generateButton').addEventListener('click', async function() {
    
    const generateButton = document.getElementById('generateButton');
    const generatedCodeElement = document.getElementById('generatedCode');
    const expiryInfoElement = document.getElementById('expiryInfo');
    
    // 1. Tenta obter o período do seletor
    const periodSelectElement = document.getElementById('periodSelect');
    let selectedPeriod;

    if (periodSelectElement) {
        selectedPeriod = parseInt(periodSelectElement.value);
    }
    
    // 2. Validação dos Dados
    if (isNaN(selectedPeriod) || (selectedPeriod !== 3 && selectedPeriod !== 7)) {
        generatedCodeElement.textContent = 'ERRO';
        expiryInfoElement.textContent = 'ERRO: Por favor, selecione um período válido (3 ou 7 dias).';
        
        // Reabilita o botão apenas para limpar o estado de "Gerando..."
        generateButton.textContent = 'Gerar Novo Código';
        generateButton.disabled = false;
        return; 
    }

    // Desabilita o botão para evitar cliques múltiplos e inicia o feedback visual
    generateButton.textContent = 'Gerando...';
    generateButton.disabled = true;
    generatedCodeElement.textContent = '---';
    expiryInfoElement.textContent = 'Validade: Buscando no servidor...';

    try {
        // 🛑 CORREÇÃO APLICADA: Usando API_GENERATE_URL, que é a URL correta do Netlify
        const response = await fetch(API_GENERATE_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                periodDays: selectedPeriod
            })
        });

        const data = await response.json();

        if (data.success && data.token) {
            // Sucesso! Recebeu o token do servidor
            generatedCodeElement.textContent = data.token;
            
            // Calcula e exibe a validade (usamos o tempo atual do cliente para o display)
            const periodDays = PERIODOS[selectedPeriod];
            const msPerPeriod = periodDays * 24 * 60 * 60 * 1000;
            const expiryDate = new Date(Date.now() + msPerPeriod);

            expiryInfoElement.textContent = 'Validade: Expira em ' + expiryDate.toLocaleString('pt-BR');

        } else {
            // Erro na geração
            generatedCodeElement.textContent = 'ERRO';
            expiryInfoElement.textContent = 'Falha ao gerar código: ' + (data.message || 'Erro desconhecido');
        }

    } catch (error) {
        generatedCodeElement.textContent = 'ERRO';
        expiryInfoElement.textContent = 'Erro de Rede: Não foi possível conectar ao servidor.';
    } finally {
        // Reabilita o botão
        generateButton.textContent = 'Gerar Novo Código';
        generateButton.disabled = false;
    }
});


// Função para copiar para a área de transferência
function copyCode() {
    const code = document.getElementById('generatedCode').textContent;
    if (code === '---' || code.startsWith('ERRO')) {
        alert('Nenhum código válido para copiar.');
        return;
    }
    navigator.clipboard.writeText(code).then(function() {
        alert('Código copiado para a área de transferência.');
    }, function() {
        alert('Falha ao copiar o código.');
    });
}