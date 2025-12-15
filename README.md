# 🔑 Gerador de Códigos Expiráveis (Web Client)

Este é o cliente web front-end para o Gerador de Códigos Expiráveis. A aplicação permite ao usuário selecionar um período de validade (3 ou 7 dias) e requisitar um código único e seguro do servidor Netlify Functions, exibindo-o junto com sua data de expiração.

## ✨ Recursos Principais

* **Geração Segura:** Faz requisições POST para um endpoint de API (Netlify Functions) para gerar códigos JWT (JSON Web Tokens) com validade pré-definida.
* **Interface Moderna (Glassmorphism):** Design limpo e moderno, usando efeitos de vidro e cores vibrantes (`#7B68EE` e `#00CED1`).
* **Copiar com um Clique:** Funcionalidade fácil para copiar o código gerado para a área de transferência.
* **Novo! 🚀 Splash Screen/Loader:** Adição de uma tela de carregamento inicial moderna com uma animação sequencial de 5 quadrados, garantindo uma abertura fluida e profissional do aplicativo.

## 💻 Tecnologia Utilizada

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura semântica da interface. |
| **CSS3** | Estilização moderna, incluindo Flexbox, `backdrop-filter` (Glassmorphism) e animações `@keyframes` para o loader. |
| **JavaScript (ES6+)** | Lógica de geração, requisições `fetch` assíncronas para o endpoint da API e controle do ciclo de vida do loader. |

## ⚙️ Instalação e Uso

Para rodar este projeto localmente ou em seu ambiente de desenvolvimento:

1.  **Clone o Repositório:**
    ```bash
    git clone (https://github.com/Teo986L/GeradorDeCodigos.git))
    ```
2.  **Abra o Arquivo:**
    Basta abrir o arquivo `index.html` em qualquer navegador web moderno.
    
    > **Nota:** Este é um cliente que depende de uma função de API externa (`https://teal-pudding-cc9e1b.netlify.app/.netlify/functions/generate`) para funcionar. Garanta que essa URL esteja acessível.

## 📝 Detalhes da Implementação do Loader

O loader foi implementado para fornecer feedback visual imediato ao usuário:

* **Estrutura:** O `loader-container` é a primeira coisa no `<body>` do `index.html` com alto `z-index`.
* **Animação:** A animação de "encher" (mudança de `opacity` e `background-color`) é controlada via CSS (`@keyframes encher-quadrado`) com `animation-delay` sequencial nos 5 elementos (`.quadrado-animado`).
* **Remoção:** O `generator_script.js` usa `setTimeout` no evento `DOMContentLoaded` para remover o loader suavemente (usando a transição `fade-out` no CSS) após a duração definida.

---

## 📞 Contato

Se você tiver dúvidas, sugestões ou quiser saber mais sobre a função Serverless de backend, entre em contato!

[Teo/traderbot.ao]
