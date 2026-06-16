// Aguarda o carregamento total do HTML antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    inicializarMenu();
    inicializarFormulario();
    inicializarAnimacoes();
});

/**
 * 1. CONTROLE DO MENU RESPONSIVO (Interatividade)
 * Altera visualmente o menu de navegação em telas menores.
 */
function inicializarMenu() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const listaMenu = document.querySelector(".nav-links");

    if (botaoMenu && listaMenu) {
        botaoMenu.addEventListener("click", () => {
            listaMenu.classList.toggle("ativo");
            botaoMenu.setAttribute("aria-expanded", listaMenu.classList.contains("ativo"));
        });
    }
}

/**
 * 2. VALIDAÇÃO DE FORMULÁRIO (Inteligência e Segurança)
 * Valida o formulário de contato ou de envio de projetos do Agrinho.
 */
function inicializarFormulario() {
    const formulario = document.querySelector("#form-agrinho");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Impede o envio padrão do HTML

            const nome = document.querySelector("#nome").value.trim();
            const email = document.querySelector("#email").value.trim();
            const mensagem = document.querySelector("#mensagem").value.trim();

            if (!nome || !email || !mensagem) {
                exibirAlerta("Por favor, preencha todos os campos obrigatórios.", "erro");
                return;
            }

            if (!validarEmail(email)) {
                exibirAlerta("Por favor, insira um e-mail válido.", "erro");
                return;
            }

            // Simulação de envio com sucesso
            exibirAlerta("Mensagem enviada com sucesso! Boa sorte no Agrinho 2026! 🌱", "sucesso");
            formulario.reset();
        });
    }
}

// Função auxiliar para validar formato do e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função auxiliar para criar alertas visuais dinâmicos
function exibirAlerta(texto, tipo) {
    const caixaAlerta = document.createElement("div");
    caixaAlerta.className = `alerta alerta-${tipo}`;
    caixaAlerta.innerText = texto;

    document.body.appendChild(caixaAlerta);

    // Remove o alerta da tela após 4 segundos
    setTimeout(() => {
        caixaAlerta.remove();
    }, 4000);
}

/**
 * 3. ANIMAÇÕES AO ROLAR A PÁGINA (Comportamento Dinâmico)
 * Faz os elementos surgirem suavemente conforme o usuário rola a página.
 */
function inicializarAnimacoes() {
    const elementosParaAnimar = document.querySelectorAll(".animar-scroll");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1 });

    elementosParaAnimar.forEach(elemento => observador.observe(elemento));
}
