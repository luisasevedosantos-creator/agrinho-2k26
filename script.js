// Aguarda o carregamento total do HTML antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    inicializarMenu();
    inicializarFormulario();
    inicializarAnimacoes();
    inicializarFerramenta();
});

/**
 * 1. CONTROLE DO MENU RESPONSIVO
 * Abre/fecha o menu de navegação em telas menores.
 */
function inicializarMenu() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const listaMenu = document.querySelector(".nav-links");

    if (botaoMenu && listaMenu) {
        botaoMenu.addEventListener("click", () => {
            const aberto = listaMenu.classList.toggle("ativo");
            botaoMenu.setAttribute("aria-expanded", aberto);
            botaoMenu.innerHTML = aberto
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Fecha o menu ao clicar em um link (mobile)
        listaMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                listaMenu.classList.remove("ativo");
                botaoMenu.setAttribute("aria-expanded", "false");
                botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
}

/**
 * 2. VALIDAÇÃO DE FORMULÁRIO
 * Valida o formulário de contato do projeto Agrinho.
 */
function inicializarFormulario() {
    const formulario = document.querySelector("#form-agrinho");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

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
    const alertaExistente = document.querySelector(".alerta");
    if (alertaExistente) alertaExistente.remove();

    const caixaAlerta = document.createElement("div");
    caixaAlerta.className = `alerta alerta-${tipo}`;
    caixaAlerta.innerText = texto;
    document.body.appendChild(caixaAlerta);

    setTimeout(() => caixaAlerta.remove(), 4000);
}

/**
 * 3. ANIMAÇÕES AO ROLAR A PÁGINA
 * Faz os elementos surgirem suavemente conforme o usuário rola a página.
 */
function inicializarAnimacoes() {
    const elementos = document.querySelectorAll(".animar-scroll");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(el => observador.observe(el));
}

/**
 * 4. FERRAMENTA INTERATIVA (Slider de economia de água)
 */
function inicializarFerramenta() {
    const slider = document.querySelector("#agua");
    const resultado = document.querySelector("#resultado-agua");

    if (slider && resultado) {
        slider.addEventListener("input", () => {
            resultado.textContent = slider.value + "%";
        });
    }
}
